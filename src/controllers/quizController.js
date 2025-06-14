const { Question, StudentQuiz, StudentQuizQuestion, AnswerMotivation, Section, Lesson, LessonTranslation, Unit, UnitTranslation, User, QuestionTranslation, AnswerMotivationTranslation } = require('../models');
const { Op, Sequelize } = require('sequelize');
const AchievementController = require('./achievementController');

class QuizController {

  static async getQuizQuestions(req, res) {
      try {
        const { id } = req.params; 
        const language = req.headers['accept-language'] || 'en';
  
        if (!id) return res.status(400).json({ success: false, message: 'Lesson ID is required' });
  
        const quizQuestions = await Question.findAll({
          where: { lesson_id: id, level: { [Op.in]: ['easy', 'medium', 'hard'] } },
          include: [{
            model: QuestionTranslation,
            as: 'translations',
            where: { language },
            required: true, 
          }],
          order: Sequelize.literal('RAND()'),
        });
  
        console.log(`Total questions found for lesson ${id}: ${quizQuestions.length}`);
        console.log(`Easy: ${quizQuestions.filter(q => q.level === 'easy').length}, Medium: ${quizQuestions.filter(q => q.level === 'medium').length}, Hard: ${quizQuestions.filter(q => q.level === 'hard').length}`);
  
        let selectedQuestions = {
          easy: quizQuestions.filter(q => q.level === 'easy').slice(0, 3),
          medium: quizQuestions.filter(q => q.level === 'medium').slice(0, 4),
          hard: quizQuestions.filter(q => q.level === 'hard').slice(0, 3),
        };
  
        let totalSelected = selectedQuestions.easy.length + selectedQuestions.medium.length + selectedQuestions.hard.length;
  
        if (totalSelected < 10) {
          console.log(`Only ${totalSelected} questions selected. Filling the gap...`);
          const remainingQuestions = quizQuestions.filter(
            q => !selectedQuestions.easy.includes(q) && 
                 !selectedQuestions.medium.includes(q) && 
                 !selectedQuestions.hard.includes(q)
          );
          const additionalQuestions = remainingQuestions.slice(0, 10 - totalSelected);
          selectedQuestions.additional = additionalQuestions;
          totalSelected += additionalQuestions.length;
          console.log(`Added ${additionalQuestions.length} additional questions. Total now: ${totalSelected}`);
        }
  
        const questions = [
          ...selectedQuestions.easy,
          ...selectedQuestions.medium,
          ...selectedQuestions.hard,
          ...(selectedQuestions.additional || [])
        ].slice(0, 10) // Ensure exactly 10 questions
          .map(q => ({
            id: q.id,
            lesson_id: q.lesson_id,
            type: q.type,
            level: q.level,
            points: q.points,
            question: q.translations[0].question_text,
            options: q.translations[0].options,
            correct_answer: q.translations[0].correct_answer,
            hint: q.translations[0].hint,
          }));
  
        console.log(`Final question count for lesson ${id}: ${questions.length}`);
  
        if (questions.length < 10) {
          console.warn(`Warning: Only ${questions.length} questions available for lesson ${id}`);
          return res.status(400).json({ 
            success: false, 
            message: `Insufficient questions available for lesson ${id}. Found ${questions.length}, required 10.` 
          });
        }
  
        res.json({ success: true, questions });
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
      }
    }
  
    static async submitQuiz(req, res) {
      try {
        const { user_id, lesson_id, unit_id, answers } = req.body;
        const language = req.headers['accept-language'] || 'en';
  
        if (!user_id || !lesson_id || !unit_id || !Array.isArray(answers) || answers.length === 0) {
          return res.status(400).json({ success: false, message: 'Invalid input data' });
        }
  
        let score = 0, earnedPoints = 0;
  
        // new StudentQuiz entry
        const quiz = await StudentQuiz.create({
          user_id,
          lesson_id,
          unit_id,
          score: 0,
          earned_points: 0,
          is_passed: false,
        });
  
        const questionIds = answers.map(ans => parseInt(ans.question_id, 10));
        const questions = await Question.findAll({
          where: { id: { [Op.in]: questionIds } },
          include: [{
            model: QuestionTranslation,
            as: 'translations',
            where: { language },
            required: true,
          }],
        });
  
        if (!questions || questions.length === 0) {
          return res.status(404).json({ success: false, message: 'No questions found for the provided IDs' });
        }
  
        const answerMotivations = await AnswerMotivation.findAll({
          include: [{
            model: AnswerMotivationTranslation,
            as: 'translations',
            where: { language },
            required: true,
          }],
        });
  
        const motivationMap = answerMotivations.reduce((acc, item) => {
          acc[item.answer_type] = item.translations[0].text;
          return acc;
        }, {});
  
        const detailedAnswers = [];
  
        for (const ans of answers) {
          const question = questions.find(q => q.id === parseInt(ans.question_id, 10));
          if (!question) continue;
  
          const isCorrect = question.translations[0].correct_answer === ans.selected_answer;
          if (isCorrect) {
            score += 1;
            earnedPoints += question.points || 0;
          }
  
          await StudentQuizQuestion.create({
            quiz_id: quiz.id,
            question_id: question.id,
            answer: ans.selected_answer,
            is_correct: isCorrect,
          });
  
          detailedAnswers.push({
            question_id: question.id,
            question: question.translations[0].question_text,
            options: question.translations[0].options,
            correct_answer: question.translations[0].correct_answer,
            user_answer: ans.selected_answer,
            is_correct: isCorrect,
            motivation_message: motivationMap[isCorrect ? 'correct' : 'wrong'] || 'Keep trying!',
            hint: question.translations[0].hint,
          });
        }
  
        const isPassed = score >= 5;
        await quiz.update({ score, earned_points: earnedPoints, is_passed: isPassed });
  
        const user = await User.findByPk(user_id);
        if (user) {
          user.earned_points += earnedPoints;
          await user.save();
        }
  
        const achievements = await AchievementController.checkAndUnlockAchievements({ userId: user_id });
  
        res.json({
          success: true,
          student_quiz_id: quiz.id,
          score,
          total_questions: questions.length,
          earned_points: earnedPoints,
          is_passed: isPassed,
          total_user_points: user ? user.earned_points : 0,
          answers: detailedAnswers,
          achievements: achievements || [],
        });
      } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
      }
    }
  

  static async submitQuiz(req, res) {
    try {
      const { user_id, lesson_id, unit_id, answers } = req.body;
      const language = req.headers['accept-language'] || 'en';

      if (!user_id || !lesson_id || !unit_id || !Array.isArray(answers) || answers.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid input data' });
      }

      let score = 0, earnedPoints = 0;

      const quiz = await StudentQuiz.create({
        user_id,
        lesson_id,
        unit_id,
        score: 0,
        earned_points: 0,
        is_passed: false,
      });

      const questionIds = answers.map(ans => parseInt(ans.question_id, 10));
      const questions = await Question.findAll({
        where: { id: { [Op.in]: questionIds } },
        include: [{
          model: QuestionTranslation,
          as: 'translations',
          where: { language },
          required: true,
        }],
      });

      if (!questions || questions.length === 0) {
        return res.status(404).json({ success: false, message: 'No questions found for the provided IDs' });
      }

      const answerMotivations = await AnswerMotivation.findAll({
        include: [{
          model: AnswerMotivationTranslation,
          as: 'translations',
          where: { language },
          required: true,
        }],
      });

      const motivationMap = answerMotivations.reduce((acc, item) => {
        acc[item.answer_type] = item.translations[0].text;
        return acc;
      }, {});

      const detailedAnswers = [];

      for (const ans of answers) {
        const question = questions.find(q => q.id === parseInt(ans.question_id, 10));
        if (!question) continue;

        const isCorrect = question.translations[0].correct_answer === ans.selected_answer;
        if (isCorrect) {
          score += 1;
          earnedPoints += question.points || 0;
        }

        await StudentQuizQuestion.create({
          quiz_id: quiz.id,
          question_id: question.id,
          answer: ans.selected_answer,
          is_correct: isCorrect,
        });

        detailedAnswers.push({
          question_id: question.id,
          question: question.translations[0].question_text,
          options: question.translations[0].options,
          correct_answer: question.translations[0].correct_answer,
          user_answer: ans.selected_answer,
          is_correct: isCorrect,
          motivation_message: motivationMap[isCorrect ? 'correct' : 'wrong'] || 'Keep trying!',
          hint: question.translations[0].hint,
        });
      }

      const isPassed = score >= 5;
      await quiz.update({ score, earned_points: earnedPoints, is_passed: isPassed });

      const user = await User.findByPk(user_id);
      if (user) {
        user.earned_points += earnedPoints;
        await user.save();
      }

      const achievements = await AchievementController.checkAndUnlockAchievements({ userId: user_id });
///
      if (achievements.length > 0) {
        responseData.new_achievements = achievements; 
      }

      res.json({
        success: true,
        student_quiz_id: quiz.id,
        score,
        total_questions: questions.length,
        earned_points: earnedPoints,
        is_passed: isPassed,
        total_user_points: user ? user.earned_points : 0,
        answers: detailedAnswers,
        achievements: achievements.achievements || [],
      });
    } catch (error) {
      console.error('Error submitting quiz:', error);
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  }




  static async getUnitQuiz(req, res) {
    try {
      const { user_id, unit_id } = req.params;
      const language = req.headers['accept-language'] || 'en';
      
      if (!user_id || !unit_id) {
        return res.status(400).json({ success: false, message: 'User ID and Unit ID are required' });
      }

      // Verify unit exists
      const unit = await Unit.findByPk(unit_id, {
        include: [{
          model: UnitTranslation,
          as: 'translations',
          where: { language },
          required: false,
        }],
      });
      if (!unit) {
        return res.status(404).json({ success: false, message: 'Unit not found' });
      }

      const lessons = await Lesson.findAll({
        where: { unit_id },
        attributes: ['id'],
      });

      if (!lessons.length) {
        return res.status(404).json({ success: false, message: 'No lessons found for this unit' });
      }

      const lessonIds = lessons.map(lesson => lesson.id);
      
      // Get user's latest quiz attempts for these lessons
      const quizzes = await StudentQuiz.findAll({
        where: { 
          user_id, 
          lesson_id: { [Op.in]: lessonIds },
          score: { [Op.ne]: null }
        },
        attributes: ['lesson_id', 'score', 'is_passed', 'created_at'],
        order: [['created_at', 'DESC']],
      });

      let selectedQuestions = [];
      let totalQuestions = 0;

      if (quizzes.length === 0) {
        // If user has no previous quizzes, get 10 random questions as fallback
        selectedQuestions = await Question.findAll({
          where: { lesson_id: { [Op.in]: lessonIds } },
          include: [{
            model: QuestionTranslation,
            as: 'translations',
            where: { language },
            required: false,
          }],
          order: Sequelize.literal('RAND()'),
          limit: 10,
        });
        totalQuestions = selectedQuestions.length;
      } else {
        // Group quizzes by lesson_id to get the latest attempt for each lesson
        const latestQuizzes = {};
        quizzes.forEach(quiz => {
          if (!latestQuizzes[quiz.lesson_id] || quiz.created_at > latestQuizzes[quiz.lesson_id].created_at) {
            latestQuizzes[quiz.lesson_id] = quiz;
          }
        });

        // Select questions based on the latest score for each lesson
        for (const lessonId of lessonIds) {
          const quiz = latestQuizzes[lessonId];
          let questionLimit;

          if (!quiz) {
            questionLimit = 3;
          } else if (quiz.score >= 8) {
            questionLimit = 2;
          } else if (quiz.score <= 7 && quiz.score >= 6) {
            questionLimit = 3;
          } else {
            questionLimit = 5;
          }

          const questions = await Question.findAll({
            where: { lesson_id: lessonId },
            include: [{
              model: QuestionTranslation,
              as: 'translations',
              where: { language },
              required: false,
            }],
            order: Sequelize.literal('RAND()'),
            limit: questionLimit,
          });

          selectedQuestions.push(...questions);
          totalQuestions += Math.min(questionLimit, questions.length);
        }
      }

      if (totalQuestions > 25) {
        selectedQuestions = selectedQuestions.slice(0, 25);
        totalQuestions = 25;
      }

      const formattedQuestions = selectedQuestions.map((q, index) => {
        const translation = q.translations && q.translations.length > 0 
          ? q.translations[0] 
          : null;

        return {
          id: q.id,
          lesson_id: q.lesson_id,
          type: q.type,
          level: q.level,
          points: q.points,
          question: translation?.question_text || `Question ${q.id}`,
          options: translation?.options || ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          correct_answer: translation?.correct_answer || 'Option 1',
          hint: translation?.hint || 'No hint available',
          question_index: index + 1, 
        };
      });

      res.json({ 
        success: true, 
        questions: formattedQuestions,
        total_questions: totalQuestions,
        unit_name: unit.translations?.[0]?.name || `Unit ${unit_id}`,
      });
    } catch (error) {
      console.error('Error fetching unit quiz:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Server error', 
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }

  static async submitUnitQuiz(req, res) {
    try {
      const { user_id, unit_id, answers, total_questions } = req.body; 
      const language = req.headers['accept-language'] || 'en';
  
      if (!user_id || !unit_id || !Array.isArray(answers) || answers.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid input data' });
      }
  
      const unit = await Unit.findByPk(unit_id, {
        include: [{
          model: UnitTranslation,
          as: 'translations',
          where: { language },
          required: false,
        }],
      });
      if (!unit) {
        return res.status(404).json({ success: false, message: 'Unit not found' });
      }
  
      let score = 0;
      let earnedPoints = 0;
  
      const unitQuiz = await StudentQuiz.create({
        user_id,
        unit_id,
        score: 0,
        earned_points: 0,
        is_passed: false,
      });
  
      const questionIds = answers.map(ans => parseInt(ans.question_id, 10));
      const questions = await Question.findAll({
        where: { id: { [Op.in]: questionIds } },
        include: [{
          model: QuestionTranslation,
          as: 'translations',
          where: { language },
          required: false,
        }],
      });
  
      if (!questions || questions.length === 0) {
        return res.status(404).json({ success: false, message: 'No questions found for the provided IDs' });
      }
  
      const answerMotivations = await AnswerMotivation.findAll({
        include: [{
          model: AnswerMotivationTranslation,
          as: 'translations',
          where: { language },
          required: false,
        }],
      });
  
      const motivationMap = answerMotivations.reduce((acc, item) => {
        const text = item.translations && item.translations.length > 0
          ? item.translations[0].text
          : item.answer_type === 'correct' ? 'Correct!' : 'Try again!';
        acc[item.answer_type] = text;
        return acc;
      }, {});
  
      const detailedAnswers = [];
  
      for (const ans of answers) {
        const question = questions.find(q => q.id === parseInt(ans.question_id, 10));
        if (!question) continue;
  
        const translation = question.translations && question.translations.length > 0
          ? question.translations[0]
          : null;
  
        const correctAnswer = translation?.correct_answer || 'Option 1';
        const isCorrect = correctAnswer.toLowerCase() === ans.user_answer.toLowerCase();
  
        if (isCorrect) {
          score += 1;
          earnedPoints += question.points || 0;
        }
  
        await StudentQuizQuestion.create({
          quiz_id: unitQuiz.id,
          question_id: question.id,
          answer: ans.user_answer,
          is_correct: isCorrect,
        });
  
        detailedAnswers.push({
          question_id: question.id,
          question: translation?.question_text || `Question ${question.id}`,
          options: translation?.options || ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          correct_answer: correctAnswer,
          user_answer: ans.user_answer,
          is_correct: isCorrect,
          motivation_message: motivationMap[isCorrect ? 'correct' : 'wrong'],
          hint: translation?.hint || 'No hint available',
        });
      }
  
      const isPassed = score >= Math.ceil((total_questions || questions.length) / 2);
      await unitQuiz.update({
        score,
        earned_points: earnedPoints,
        is_passed: isPassed,
      });
  
      const user = await User.findByPk(user_id);
      if (user) {
        user.earned_points += earnedPoints;
        await user.save();
      }
  
      console.log('Submitting unit quiz for user:', user_id);
      const achievements = await AchievementController.checkAndUnlockAchievements({ userId: user_id });
      
      if (achievements.length > 0) {
        responseData.new_achievements = achievements; 
      }
      res.json({
        success: true,
        student_quiz_id: unitQuiz.id,
        score,
        total_questions: total_questions || questions.length, 
        earned_points: earnedPoints,
        is_passed: isPassed,
        total_user_points: user ? user.earned_points : 0,
        answers: detailedAnswers,
        achievements: achievements.achievements || [],
        unit_name: unit.translations?.[0]?.name || `Unit ${unit_id}`,
      });
    } catch (error) {
      console.error('Error submitting unit quiz:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }


  static async getUserQuizProgress(req, res) {
    try {
      const { user_id } = req.params;
      const language = req.headers['accept-language'] || 'en';
  
      if (!user_id) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
      }
  
      const quizzes = await StudentQuiz.findAll({
        where: { user_id },
        attributes: ['id', 'lesson_id', 'unit_id', 'score', 'earned_points', 'is_passed', 'created_at'],
        include: [
          {
            model: Lesson,
            as: 'lesson',
            attributes: ['id', 'unit_id'],
            include: [
              {
                model: LessonTranslation,
                as: 'translations',
                attributes: ['title'],
                where: { language },
                required: false,
              },
            ],
          },
          {
            model: Unit,
            as: 'unit',
            attributes: ['id'],
            include: [
              {
                model: UnitTranslation,
                as: 'translations',
                attributes: ['name'],
                where: { language },
                required: false,
              },
            ],
          },
          {
            model: StudentQuizQuestion,
            as: 'questions',
            attributes: ['id'],
          },
        ],
        order: [['created_at', 'DESC']],
      });
  
      const unitLessons = await Lesson.findAll({
        attributes: ['id', 'unit_id'],
        order: [['unit_id', 'ASC'], ['id', 'ASC']],
      });
  
      const lessonNumbers = {};
      unitLessons.forEach((lesson, index) => {
        if (!lessonNumbers[lesson.unit_id]) {
          lessonNumbers[lesson.unit_id] = {};
        }
        const lessonsInUnit = unitLessons.filter(l => l.unit_id === lesson.unit_id);
        const lessonIndex = lessonsInUnit.findIndex(l => l.id === lesson.id);
        lessonNumbers[lesson.unit_id][lesson.id] = lessonIndex + 1;
      });
  
      const progress = quizzes.map(quiz => {
        const totalQuestions = quiz.questions ? quiz.questions.length : 0; 
        const lessonNumber = quiz.lesson_id 
          ? lessonNumbers[quiz.lesson?.unit_id]?.[quiz.lesson_id] || null
          : null;
  
        return {
          id: quiz.id,
          lesson_id: quiz.lesson_id,
          unit_id: quiz.unit_id,
          score: quiz.score || 0,
          total_questions: totalQuestions, 
          earned_points: quiz.earned_points || 0,
          is_passed: quiz.is_passed || false,
          created_at: quiz.created_at,
          lesson_name: quiz.lesson?.translations?.[0]?.title || `Lesson ${quiz.lesson_id || 'N/A'}`,
          unit_name: quiz.unit?.translations?.[0]?.name || `Unit ${quiz.unit_id || 'N/A'}`,
          lesson_number: lessonNumber, 
        };
      });
  
      res.json({
        success: true,
        progress,
      });
    } catch (error) {
      console.error('Error fetching user quiz progress:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }

  static async getQuizReviewDetails(req, res) {
    try {
      const { quiz_id } = req.params;
      const language = req.headers['accept-language'] || 'en';
      
      if (!quiz_id) {
        return res.status(400).json({ 
          success: false, 
          code: 'MISSING_QUIZ_ID',
          message: 'Quiz ID is required',
        });
      }

      // Fetch the quiz data
      const quiz = await StudentQuiz.findOne({
        where: { id: quiz_id },
        include: [
          {
            model: StudentQuizQuestion,
            as: 'questions',
            attributes: ['id', 'question_id', 'answer', 'is_correct'],
            include: [
              {
                model: Question,
                as: 'question',
                include: [{
                  model: QuestionTranslation,
                  as: 'translations',
                  where: { language },
                  required: false,
                  attributes: ['question_text', 'options', 'correct_answer', 'hint'],
                }],
              },
            ],
          },
          {
            model: Lesson,
            as: 'lesson',
            attributes: ['id', 'unit_id'],
            include: [{
              model: LessonTranslation,
              as: 'translations',
              where: { language },
              required: false,
              attributes: ['title'],
            }],
          },
          {
            model: Unit,
            as: 'unit',
            attributes: ['id'],
            include: [{
              model: UnitTranslation,
              as: 'translations',
              where: { language },
              required: false,
              attributes: ['name'],
            }],
          },
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name'],
          },
        ],
      });

      if (!quiz) {
        return res.status(404).json({ 
          success: false, 
          code: 'QUIZ_NOT_FOUND',
          message: 'Quiz not found',
        });
      }

      // Get motivation messages in the requested language
      const answerMotivations = await AnswerMotivation.findAll({
        include: [{
          model: AnswerMotivationTranslation,
          as: 'translations',
          where: { language },
          required: false,
        }],
      });

      const motivationMap = answerMotivations.reduce((acc, motivation) => {
        const text = motivation.translations?.[0]?.text || 
                    (motivation.answer_type === 'correct' ? 'Correct!' : 'Try again!');
        acc[motivation.answer_type] = text;
        return acc;
      }, {});

      const seenQuestionIds = new Set();
      const uniqueAnswers = quiz.questions?.filter(q => {
        if (seenQuestionIds.has(q.question_id)) {
          return false;
        }
        seenQuestionIds.add(q.question_id);
        return true;
      }) || [];

      const reviewData = {
        quiz_id: quiz.id,
        quiz_type: quiz.unit_id && !quiz.lesson_id ? 'unit' : 'lesson',
        quiz_title: quiz.unit_id 
          ? quiz.unit.translations?.[0]?.name || `Unit Quiz`
          : quiz.lesson.translations?.[0]?.title || `Lesson Quiz`,
        user_id: quiz.user_id,
        username: quiz.user?.name || 'Anonymous',
        score: quiz.score || 0,
        total_questions: quiz.total_questions || uniqueAnswers.length || 0,
        earned_points: quiz.earned_points || 0,
        is_passed: Boolean(quiz.is_passed),
        completed_at: quiz.created_at,
        percentage: Math.round(((quiz.score || 0) / (quiz.total_questions || uniqueAnswers.length || 1)) * 100),
        answers: uniqueAnswers.map(q => {
          const question = q.question;
          const translation = question.translations?.[0] || {};
          
          return {
            question_id: question.id,
            question: translation.question_text || `Question ${question.id}`,
            options: translation.options || [],
            correct_answer: translation.correct_answer || 'No correct answer',
            user_answer: q.answer || 'No answer provided',
            is_correct: Boolean(q.is_correct),
            motivation_message: motivationMap[q.is_correct ? 'correct' : 'wrong'],
            hint: translation.hint || 'No hint available',
            points: question.points || 0,
            earned_points: q.is_correct ? (question.points || 0) : 0,
          };
        }),
      };

      res.json({ 
        success: true, 
        reviewData,
      });

    } catch (error) {
      console.error('Error fetching quiz review details:', error);
      res.status(500).json({ 
        success: false, 
        code: 'SERVER_ERROR',
        message: 'Failed to fetch quiz review',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }


  static async checkLessonAccess(req, res) {
    try {
      const { user_id, lesson_id, unit_id } = req.params;

      // Validate input parameters
      if (!user_id || user_id === 'undefined') {
        return res.status(400).json({ success: false, message: 'Invalid user ID' });
      }

      // Log incoming parameters for debugging
      console.log(`Checking access: user_id=${user_id}, lesson_id=${lesson_id}, unit_id=${unit_id}`);

      // Case 1: Checking access for a unit quiz (unit_id provided, no lesson_id)
      if (unit_id && !lesson_id) {
        const currentUnit = await Unit.findOne({ where: { id: unit_id } });
        if (!currentUnit) {
          return res.status(404).json({ success: false, message: 'Unit not found' });
        }

        // Find the last lesson in the unit (highest id)
        const lastLessonInUnit = await Lesson.findOne({
          where: { unit_id: currentUnit.id },
          order: [['id', 'DESC']],
        });

        if (!lastLessonInUnit) {
          return res.status(404).json({ success: false, message: 'No lessons found in this unit' });
        }

        // Check if the user has passed the quiz for the last lesson
        const lastLessonQuiz = await StudentQuiz.findOne({
          where: { user_id, lesson_id: lastLessonInUnit.id, is_passed: true },
        });
        console.log(`Last lesson quiz for lesson_id=${lastLessonInUnit.id}:`, lastLessonQuiz ? lastLessonQuiz : 'Not found');

        if (!lastLessonQuiz) {
          console.log(`Access denied: No passing quiz for last lesson, lesson_id=${lastLessonInUnit.id}`);
          return res.status(403).json({
            success: false,
            message: 'You must pass the last lesson quiz in this unit to access the unit quiz',
          });
        }

        console.log(`Granting access to unit quiz: unit_id=${unit_id}`);
        return res.json({ success: true, message: 'Access granted to unit quiz' });
      }

      // Case 2: Checking access for a lesson (lesson_id provided)
      if (!lesson_id || lesson_id === 'undefined') {
        return res.status(400).json({ success: false, message: 'Invalid lesson ID' });
      }

      const currentLesson = await Lesson.findOne({ where: { id: lesson_id } });
      if (!currentLesson) {
        return res.status(404).json({ success: false, message: 'Lesson not found' });
      }

      const currentUnit = await Unit.findOne({ where: { id: currentLesson.unit_id } });
      if (!currentUnit) {
        return res.status(404).json({ success: false, message: 'Unit not found' });
      }

      // Log lesson and unit details
      console.log(`Current lesson: id=${currentLesson.id}, unit_id=${currentLesson.unit_id}`);
      console.log(`Current unit: id=${currentUnit.id}, section_id=${currentUnit.section_id}`);

      // Determine if this is the first lesson in the unit (lowest id)
      const firstLessonInUnit = await Lesson.findOne({
        where: { unit_id: currentLesson.unit_id },
        order: [['id', 'ASC']],
      });
      const isFirstLessonInUnit = firstLessonInUnit.id === currentLesson.id;

      // Determine if this is the first unit in the section (lowest id)
      const firstUnitInSection = await Unit.findOne({
        where: { section_id: currentUnit.section_id },
        order: [['id', 'ASC']],
      });
      const isFirstUnitInSection = firstUnitInSection.id === currentUnit.id;

      // Check if this is the first section in the course (lowest id)
      const firstSection = await Section.findOne({
        order: [['id', 'ASC']],
      });
      const isFirstSection = firstSection ? firstSection.id === currentUnit.section_id : false;

      // Log conditions for debugging
      console.log({
        lesson_id,
        isFirstLessonInUnit,
        isFirstUnitInSection,
        isFirstSection,
        firstLessonId: firstLessonInUnit.id,
        firstUnitId: firstUnitInSection.id,
        firstSectionId: firstSection ? firstSection.id : 'null',
        currentUnitSectionId: currentUnit.section_id,
      });

      // If this is the first lesson of the first unit in the first section, grant access
      if (isFirstLessonInUnit && isFirstUnitInSection && isFirstSection) {
        console.log(`Granting access to first lesson: lesson_id=${lesson_id}`);
        return res.json({ success: true, message: 'Access granted (first lesson of the course)' });
      }

      // If this is the first lesson in a unit (but not the first unit in the section), check previous unit's quiz
      if (isFirstLessonInUnit && !isFirstUnitInSection) {
        console.log(`Checking previous unit for lesson_id=${lesson_id}`);
        const previousUnit = await Unit.findOne({
          where: { section_id: currentUnit.section_id, id: { [Op.lt]: currentUnit.id } },
          order: [['id', 'DESC']],
        });

        if (previousUnit) {
          const unitQuiz = await StudentQuiz.findOne({
            where: { user_id, unit_id: previousUnit.id, lesson_id: null, is_passed: true },
          });
          console.log(`Unit quiz for previous unit_id=${previousUnit.id}:`, unitQuiz ? unitQuiz : 'Not found');
          if (!unitQuiz) {
            console.log(`Access denied: No passing unit quiz for previous unit, unit_id=${previousUnit.id}`);
            return res.status(403).json({
              success: false,
              message: 'You must pass the previous unit quiz to access this lesson',
            });
          }
        } else {
          // If no previous unit is found in the same section, check the previous section
          console.log(`No previous unit found in section_id=${currentUnit.section_id}, checking previous section`);
          const previousSection = await Section.findOne({
            where: { id: { [Op.lt]: currentUnit.section_id } },
            order: [['id', 'DESC']],
          });

          if (previousSection) {
            const lastUnitInPreviousSection = await Unit.findOne({
              where: { section_id: previousSection.id },
              order: [['id', 'DESC']],
            });

            if (lastUnitInPreviousSection) {
              const unitQuiz = await StudentQuiz.findOne({
                where: { user_id, unit_id: lastUnitInPreviousSection.id, lesson_id: null, is_passed: true },
              });
              console.log(`Unit quiz for last unit in previous section_id=${previousSection.id}, unit_id=${lastUnitInPreviousSection.id}:`, unitQuiz ? unitQuiz : 'Not found');
              if (!unitQuiz) {
                console.log(`Access denied: No passing unit quiz for last unit in previous section, unit_id=${lastUnitInPreviousSection.id}`);
                return res.status(403).json({
                  success: false,
                  message: 'You must pass the last unit quiz of the previous section to access this lesson',
                });
              }
            } else {
              console.log(`Access denied: No units found in previous section, section_id=${previousSection.id}`);
              return res.status(403).json({
                success: false,
                message: 'No units found in the previous section to verify access',
              });
            }
          } else {
            console.log(`Access denied: No previous section found for section_id=${currentUnit.section_id}`);
            return res.status(403).json({
              success: false,
              message: 'No previous section found to verify access',
            });
          }
        }
      }

      // If this is not the first lesson in the unit, check the previous lesson's quiz
      if (!isFirstLessonInUnit) {
        console.log(`Checking previous lesson for lesson_id=${lesson_id}`);
        const previousLesson = await Lesson.findOne({
          where: { unit_id: currentLesson.unit_id, id: { [Op.lt]: currentLesson.id } },
          order: [['id', 'DESC']],
        });

        if (previousLesson) {
          const lessonQuiz = await StudentQuiz.findOne({
            where: { user_id, lesson_id: previousLesson.id, is_passed: true },
          });
          console.log(`Lesson quiz for previous lesson_id=${previousLesson.id}:`, lessonQuiz ? lessonQuiz : 'Not found');
          if (!lessonQuiz) {
            console.log(`Access denied: No passing quiz for previous lesson, lesson_id=${previousLesson.id}`);
            return res.status(403).json({
              success: false,
              message: 'You must pass the previous lesson quiz to access this lesson',
            });
          }
        }
      }

      // Grant access if all conditions are met
      console.log(`Granting access to lesson: lesson_id=${lesson_id}`);
      return res.json({ success: true, message: 'Access granted' });
    } catch (error) {
      console.error('Error checking lesson access:', error);
      return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  }
}

module.exports = QuizController;