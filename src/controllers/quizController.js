




// controllers/quizController.js
// const { Question, StudentQuiz, StudentQuizQuestion, AnswerMotivation, Lesson, Unit, User } = require('../models');
// const { Op, Sequelize } = require('sequelize');
// const AchievementController = require('./achievementController'); // Import AchievementController

// class QuizController {
    // Existing getQuizQuestions (Lesson Quiz)
//     static async getQuizQuestions(req, res) {
//         try {
//             const { id } = req.params;
//             if (!id) return res.status(400).json({ success: false, message: 'Lesson ID is required' });

//             const quizQuestions = await Question.findAll({
//                 where: { lesson_id: id, level: { [Op.in]: ['easy', 'medium', 'hard'] } },
//                 order: Sequelize.literal('RAND()'),
//             });

//             const selectedQuestions = {
//                 easy: quizQuestions.filter(q => q.level === 'easy').slice(0, 3),
//                 medium: quizQuestions.filter(q => q.level === 'medium').slice(0, 4),
//                 hard: quizQuestions.filter(q => q.level === 'hard').slice(0, 3),
//             };

//             const questions = [...selectedQuestions.easy, ...selectedQuestions.medium, ...selectedQuestions.hard];
//             res.json({ success: true, questions });
//         } catch (error) {
//             console.error('Error in getQuizQuestions:', error);
//             res.status(500).json({ success: false, message: 'Server error', error: error.message });
//         }
//     }

 

// static async submitQuiz(req, res) {
//     try {
//         const { user_id, lesson_id, answers } = req.body;
        
//         console.log("Received submitQuiz request:", { user_id, lesson_id, answers });

//         if (!user_id || !lesson_id || !Array.isArray(answers) || answers.length === 0) {
//             return res.status(400).json({ success: false, message: 'Invalid input data' });
//         }

//         let score = 0, earnedPoints = 0;

//         const quiz = await StudentQuiz.create({ 
//             user_id, 
//             lesson_id, 
//             score: 0, 
//             earned_points: 0, 
//             is_passed: false 
//         });
        
//         // Fetch questions without including StudentQuizQuestion initially
//         const questionIds = answers.map(ans => parseInt(ans.question_id, 10));
//         const questions = await Question.findAll({
//             where: { id: { [Op.in]: questionIds } }
//         });

//         console.log("Fetched questions:", questions);

//         if (!questions || questions.length === 0) {
//             return res.status(404).json({ success: false, message: 'No questions found for the provided IDs' });
//         }

//         const answerMotivations = await AnswerMotivation.findAll();
//         const motivationMap = answerMotivations.reduce((acc, item) => {
//             acc[item.answer_type] = item.text;
//             return acc;
//         }, {});

//         const detailedAnswers = [];

//         for (const ans of answers) {
//             const question = questions.find(q => q.id === parseInt(ans.question_id, 10));
//             if (!question) {
//                 console.warn(`Question with ID ${ans.question_id} not found. Skipping...`);
//                 continue;
//             }

//             console.log(`Checking answer for question ${ans.question_id}:`, { selected_answer: ans.selected_answer, correct_answer: question.correct_answer });

//             const isCorrect = question.correct_answer === ans.selected_answer;
//             if (isCorrect) {
//                 score += 1;
//                 earnedPoints += question.points || 0; // Ensure points exist, default to 0 if not
//             }

//             await StudentQuizQuestion.create({
//                 quiz_id: quiz.id,
//                 question_id: question.id,
//                 answer: ans.selected_answer,
//                 is_correct: isCorrect
//             });

//             const detailedAnswer = {
//                 question_id: question.id,
//                 question: question.question,
//                 options: question.options,
//                 correct_answer: question.correct_answer,
//                 user_answer: ans.selected_answer,
//                 is_correct: isCorrect,
//                 motivation_message: motivationMap[isCorrect ? 'correct' : 'wrong'] || 'Keep trying!'
//             };
//             detailedAnswers.push(detailedAnswer);
//         }

//         console.log("Calculated score:", score, "Earned points:", earnedPoints, "Detailed answers:", detailedAnswers);

//         const isPassed = score >= 5;
//         await quiz.update({ score, earned_points: earnedPoints, is_passed: isPassed });

//         // Update user's earned_points in the User table
//         const user = await User.findByPk(user_id);
//         if (user) {
//             user.earned_points += earnedPoints; // Add the earned points to the existing total
//             await user.save();
//         }

//         // Check and unlock achievements after updating points
//         await AchievementController.checkAndUnlockAchievements({ params: { userId: user_id } }, res);

//         res.json({ 
//             success: true, 
//             score, 
//             earned_points: earnedPoints, 
//             is_passed: isPassed, 
//             total_user_points: user ? user.earned_points : 0, // Return updated total points
//             answers: detailedAnswers // Return detailed answers for review
//         });
//     } catch (error) {
//         console.error('Error in submitQuiz:', error);
//         res.status(500).json({ success: false, message: 'Server error', error: error.message });
//     }
// }


// controllers/quizController.js
const { Question, StudentQuiz, StudentQuizQuestion, AnswerMotivation, Lesson,LessonTranslation, Unit, UnitTranslation, User, QuestionTranslation, AnswerMotivationTranslation } = require('../models');
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
                    required: true
                }],
                order: Sequelize.literal('RAND()'),
            });

            const selectedQuestions = {
                easy: quizQuestions.filter(q => q.level === 'easy').slice(0, 3),
                medium: quizQuestions.filter(q => q.level === 'medium').slice(0, 4),
                hard: quizQuestions.filter(q => q.level === 'hard').slice(0, 3),
            };

            const questions = [...selectedQuestions.easy, ...selectedQuestions.medium, ...selectedQuestions.hard]
                .map(q => ({
                    id: q.id,
                    lesson_id: q.lesson_id,
                    type: q.type,
                    level: q.level,
                    points: q.points,
                    question: q.translations[0].question_text,
                    options: q.translations[0].options,
                    correct_answer: q.translations[0].correct_answer,
                    hint: q.translations[0].hint // Ensure hint is included
                }));

            res.json({ success: true, questions });
        } catch (error) {
            console.error('Error in getQuizQuestions:', error);
            res.status(500).json({ success: false, message: 'Server error', error: error.message });
        }
    }

//     static async submitQuiz(req, res) {
//         try {
//             const { user_id, lesson_id, answers } = req.body;
//             const language = req.headers['accept-language'] || 'en';
            
//             if (!user_id || !lesson_id || !Array.isArray(answers) || answers.length === 0) {
//                 return res.status(400).json({ success: false, message: 'Invalid input data' });
//             }

//             let score = 0, earnedPoints = 0;

//             const quiz = await StudentQuiz.create({ 
//                 user_id, 
//                 lesson_id, 
//                 score: 0, 
//                 earned_points: 0, 
//                 is_passed: false 
//             });
            
//             const questionIds = answers.map(ans => parseInt(ans.question_id, 10));
//             const questions = await Question.findAll({
//                 where: { id: { [Op.in]: questionIds } },
//                 include: [{
//                     model: QuestionTranslation,
//                     as: 'translations',
//                     where: { language },
//                     required: true
//                 }]
//             });

//             if (!questions || questions.length === 0) {
//                 return res.status(404).json({ success: false, message: 'No questions found for the provided IDs' });
//             }

//             const answerMotivations = await AnswerMotivation.findAll({
//                 include: [{
//                     model: AnswerMotivationTranslation,
//                     as: 'translations',
//                     where: { language },
//                     required: true
//                 }]
//             });

//             const motivationMap = answerMotivations.reduce((acc, item) => {
//                 acc[item.answer_type] = item.translations[0].text;
//                 return acc;
//             }, {});

//             const detailedAnswers = [];

//             for (const ans of answers) {
//                 const question = questions.find(q => q.id === parseInt(ans.question_id, 10));
//                 if (!question) continue;

//                 const isCorrect = question.translations[0].correct_answer === ans.selected_answer;
//                 if (isCorrect) {
//                     score += 1;
//                     earnedPoints += question.points || 0;
//                 }

//                 await StudentQuizQuestion.create({
//                     quiz_id: quiz.id,
//                     question_id: question.id,
//                     answer: ans.selected_answer,
//                     is_correct: isCorrect
//                 });

//                 detailedAnswers.push({
//                     question_id: question.id,
//                     question: question.translations[0].question_text,
//                     options: question.translations[0].options,
//                     correct_answer: question.translations[0].correct_answer,
//                     user_answer: ans.selected_answer,
//                     is_correct: isCorrect,
//                     motivation_message: motivationMap[isCorrect ? 'correct' : 'wrong'] || 'Keep trying!',
//                     hint: question.translations[0].hint // Include hint in response
//                 });
//             }

//             const isPassed = score >= 5;
//             await quiz.update({ score, earned_points: earnedPoints, is_passed: isPassed });

//             const user = await User.findByPk(user_id);
//             if (user) {
//                 user.earned_points += earnedPoints;
//                 await user.save();
//             }

// // Assuming checkAndUnlockAchievements returns new achievements
//             const achievements = await AchievementController.checkAndUnlockAchievements({userId: user_id});

//             res.json({ 
//                 success: true, 
//                 score, 
//                 earned_points: earnedPoints, 
//                 is_passed: isPassed, 
//                 total_user_points: user ? user.earned_points : 0,
//                 answers: detailedAnswers,
//                 achievements: achievements || [] // Include achievements
//             });
//         } catch (error) {
//             console.error('Error in submitQuiz:', error);
//             res.status(500).json({ success: false, message: 'Server error', error: error.message });
//         }
//     }
static async submitQuiz(req, res) {
    try {
      const { user_id, lesson_id, answers } = req.body;
      const language = req.headers['accept-language'] || 'en';
  
      if (!user_id || !lesson_id || !Array.isArray(answers) || answers.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid input data' });
      }
  
      let score = 0, earnedPoints = 0;
  
      const quiz = await StudentQuiz.create({
        user_id,
        lesson_id,
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
        student_quiz_id: quiz.id, // Added student_quiz_id
        score,
        total_questions: questions.length, // Added for consistency with UnitQuiz
        earned_points: earnedPoints,
        is_passed: isPassed,
        total_user_points: user ? user.earned_points : 0,
        answers: detailedAnswers,
        achievements: achievements || [],
      });
    } catch (error) {
      console.error('Error in submitQuiz:', error);
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
      const unit = await Unit.findByPk(unit_id);
      if (!unit) {
          return res.status(404).json({ success: false, message: 'Unit not found' });
      }

      // Get all lessons in this unit
      const lessons = await Lesson.findAll({
          where: { unit_id },
          attributes: ['id']
      });

      if (!lessons.length) {
          return res.status(404).json({ success: false, message: 'No lessons found for this unit' });
      }

      const lessonIds = lessons.map(lesson => lesson.id);
      
      // Get user's previous quiz attempts for these lessons
      const quizzes = await StudentQuiz.findAll({
          where: { 
              user_id, 
              lesson_id: { [Op.in]: lessonIds } 
          },
          attributes: ['lesson_id', 'score', 'is_passed'],
          order: [['created_at', 'DESC']]
      });

      let selectedQuestions = [];
      
      // If user has no previous quizzes, get 10 random questions
      if (quizzes.length === 0) {
          selectedQuestions = await Question.findAll({
              where: { lesson_id: { [Op.in]: lessonIds } },
              include: [{
                  model: QuestionTranslation,
                  as: 'translations',
                  where: { language },
                  required: false
              }],
              order: Sequelize.literal('RAND()'),
              limit: 10
          });
      } else {
          // For each quiz, select questions based on performance
          for (const quiz of quizzes) {
              let limit;
              if (quiz.score < 6) {
                  limit = 5; // More questions if they struggled
              } else if (quiz.score <= 7) {
                  limit = 3;
              } else {
                  limit = 2; // Fewer questions if they did well
              }

              const questions = await Question.findAll({
                  where: { lesson_id: quiz.lesson_id },
                  include: [{
                      model: QuestionTranslation,
                      as: 'translations',
                      where: { language },
                      required: false
                  }],
                  order: Sequelize.literal('RAND()'),
                  limit
              });
              
              selectedQuestions.push(...questions);
          }
      }

      // Format questions with translations
      const formattedQuestions = selectedQuestions.map(q => {
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
              hint: translation?.hint || 'No hint available'
          };
      });

      res.json({ 
          success: true, 
          questions: formattedQuestions,
          unit_name: unit.name || `Unit ${unit_id}`
      });
  } catch (error) {
      console.error('Error in getUnitQuiz:', error);
      res.status(500).json({ 
          success: false, 
          message: 'Server error', 
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
  }
}

// static async submitUnitQuiz(req, res) {
//   try {
//       const { user_id, unit_id, answers } = req.body;
//       const language = req.headers['accept-language'] || 'en';

//       if (!user_id || !unit_id || !Array.isArray(answers) || answers.length === 0) {
//           return res.status(400).json({ success: false, message: 'Invalid input data' });
//       }

//       // Verify unit exists
//       const unit = await Unit.findByPk(unit_id);
//       if (!unit) {
//           return res.status(404).json({ success: false, message: 'Unit not found' });
//       }

//       let score = 0;
//       let earnedPoints = 0;

//       // Create the unit quiz record
//       const unitQuiz = await StudentQuiz.create({
//           user_id,
//           unit_id,
//           score: 0,
//           earned_points: 0,
//           is_passed: false
//       });

//       // Get question IDs from answers
//       const questionIds = answers.map(ans => parseInt(ans.question_id, 10));
      
//       // Fetch questions with translations
//       const questions = await Question.findAll({
//           where: { id: { [Op.in]: questionIds } },
//           include: [{
//               model: QuestionTranslation,
//               as: 'translations',
//               where: { language },
//               required: false
//           }]
//       });

//       if (!questions || questions.length === 0) {
//           return res.status(404).json({ success: false, message: 'No questions found for the provided IDs' });
//       }

//       // Get motivation messages
//       const answerMotivations = await AnswerMotivation.findAll({
//           include: [{
//               model: AnswerMotivationTranslation,
//               as: 'translations',
//               where: { language },
//               required: false
//           }]
//       });

//       const motivationMap = answerMotivations.reduce((acc, item) => {
//           const text = item.translations && item.translations.length > 0 
//               ? item.translations[0].text 
//               : item.answer_type === 'correct' ? 'Correct!' : 'Try again!';
//           acc[item.answer_type] = text;
//           return acc;
//       }, {});

//       const detailedAnswers = [];

//       // Process each answer
//       for (const ans of answers) {
//           const question = questions.find(q => q.id === parseInt(ans.question_id, 10));
//           if (!question) continue;

//           const translation = question.translations && question.translations.length > 0 
//               ? question.translations[0] 
//               : null;

//           const correctAnswer = translation?.correct_answer || 'Option 1';
//           const isCorrect = correctAnswer.toLowerCase() === ans.user_answer.toLowerCase();

//           if (isCorrect) {
//               score += 1;
//               earnedPoints += question.points || 0;
//           }

//           // Record the answer
//           await StudentQuizQuestion.create({
//               quiz_id: unitQuiz.id,
//               question_id: question.id,
//               answer: ans.user_answer,
//               is_correct: isCorrect
//           });

//           // Prepare detailed answer for response
//           detailedAnswers.push({
//               question_id: question.id,
//               question: translation?.question_text || `Question ${question.id}`,
//               options: translation?.options || ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
//               correct_answer: correctAnswer,
//               user_answer: ans.user_answer,
//               is_correct: isCorrect,
//               motivation_message: motivationMap[isCorrect ? 'correct' : 'wrong'],
//               hint: translation?.hint || 'No hint available'
//           });
//       }

//       // Determine if user passed (50% or more correct)
//       const isPassed = score >= Math.ceil(questions.length / 2);
//       await unitQuiz.update({ 
//           score, 
//           earned_points: earnedPoints, 
//           is_passed: isPassed 
//       });

//       // Update user's total points
//       const user = await User.findByPk(user_id);
//       if (user) {
//           user.earned_points += earnedPoints;
//           await user.save();
//       }

//       // Check for achievements
//       console.log('User ID:', user_id); // Debugging log
//       const achievements = await AchievementController.checkAndUnlockAchievements({ userId: user_id });

//       res.json({
//           success: true,
//           score,
//           total_questions: questions.length,
//           earned_points: earnedPoints,
//           is_passed: isPassed,
//           total_user_points: user ? user.earned_points : 0,
//           answers: detailedAnswers,
//           achievements: achievements || [],
//           unit_name: unit.name || `Unit ${unit_id}`
//       });

//   } catch (error) {
//       console.error('Error in submitUnitQuiz:', error);
//       res.status(500).json({ 
//           success: false, 
//           message: 'Server error', 
//           error: process.env.NODE_ENV === 'development' ? error.message : undefined
//       });
//   }
// }
 
static async submitUnitQuiz(req, res) {
    try {
      const { user_id, unit_id, answers } = req.body;
      const language = req.headers['accept-language'] || 'en';
  
      if (!user_id || !unit_id || !Array.isArray(answers) || answers.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid input data' });
      }
  
      const unit = await Unit.findByPk(unit_id);
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
  
      const isPassed = score >= Math.ceil(questions.length / 2);
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
  
      console.log('User ID:', user_id); // Debugging log
      const achievements = await AchievementController.checkAndUnlockAchievements({ userId: user_id });
  
      res.json({
        success: true,
        student_quiz_id: unitQuiz.id, // Added student_quiz_id
        score,
        total_questions: questions.length,
        earned_points: earnedPoints,
        is_passed: isPassed,
        total_user_points: user ? user.earned_points : 0,
        answers: detailedAnswers,
        achievements: achievements || [],
        unit_name: unit.name || `Unit ${unit_id}`,
      });
    } catch (error) {
      console.error('Error in submitUnitQuiz:', error);
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
              return res.status(400).json({ 
                  success: false, 
                  code: 'MISSING_USER_ID',
                  message: 'User ID is required' 
              });
          }
  
          // Fetch all quiz results with translations
          const quizzes = await StudentQuiz.findAll({
              where: { user_id },
              attributes: ['id', 'lesson_id', 'unit_id', 'score', 'earned_points', 'is_passed', 'created_at'],
              include: [
                  {
                      model: Lesson,
                      as: 'lesson',
                      attributes: ['id', 'unit_id'],
                      include: [{
                          model: LessonTranslation,
                          as: 'translations',
                          where: { language },
                          required: false,
                          attributes: ['title']
                      }]
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
                          attributes: ['name']
                      }]
                  },
                  {
                      model: StudentQuizQuestion,
                      as: 'questions',
                      attributes: ['id']
                  }
              ],
              order: [['created_at', 'DESC']]
          });
  
          // Get lesson numbers by querying lesson order per unit
          const unitLessons = await Lesson.findAll({
              attributes: ['id', 'unit_id'],
              order: [['unit_id', 'ASC'], ['id', 'ASC']]
          });
  
          const lessonNumbers = {};
          unitLessons.forEach((lesson, index) => {
              if (!lessonNumbers[lesson.unit_id]) {
                  lessonNumbers[lesson.unit_id] = {};
              }
              lessonNumbers[lesson.unit_id][lesson.id] = index + 1;
          });
  
          // Format response data
          const progressData = quizzes.map(quiz => {
              const totalQuestions = quiz.questions?.length || 10;
              const percentage = Math.round(((quiz.score || 0) / totalQuestions) * 100);
              
              // Get localized names
              const lessonName = quiz.lesson?.translations?.[0]?.title || `Lesson`;
              const unitName = quiz.unit?.translations?.[0]?.name || `Unit ${quiz.unit_id}`;
              
              // Determine lesson number if applicable
              const lessonNumber = quiz.lesson_id 
                  ? lessonNumbers[quiz.lesson?.unit_id]?.[quiz.lesson_id] 
                  : null;
  
              return {
                  id: quiz.id,
                  quiz_type: quiz.unit_id ? 'unit' : 'lesson',
                  lesson_id: quiz.lesson_id,
                  unit_id: quiz.unit_id,
                  lesson_number: lessonNumber,
                  name: quiz.lesson_id 
                      ? `${unitName}, ${lessonName}` 
                      : unitName,
                  score: quiz.score || 0,
                  total_questions: totalQuestions,
                  earned_points: quiz.earned_points || 0,
                  is_passed: Boolean(quiz.is_passed),
                  percentage,
                  date: quiz.created_at
              };
          });
  
          res.json({ 
              success: true, 
              progress: progressData,
              stats: {
                  total_quizzes: quizzes.length,
                  total_points: quizzes.reduce((sum, q) => sum + (q.earned_points || 0), 0),
                  average_score: quizzes.length > 0 
                      ? Math.round(quizzes.reduce((sum, q) => sum + ((q.score || 0) / (q.questions?.length || 10)), 0) / quizzes.length * 100)
                      : 0
              }
          });
      } catch (error) {
          console.error('Error in getUserQuizProgress:', error);
          res.status(500).json({ 
              success: false, 
              code: 'SERVER_ERROR',
              message: 'Failed to fetch progress data',
              error: process.env.NODE_ENV === 'development' ? error.message : undefined
          });
      }
  }    


  //   static async getQuizReviewDetails(req, res) {
  //     try {
  //         const { quiz_id } = req.params;
  //         const language = req.headers['accept-language'] || 'en';
          
  //         if (!quiz_id) {
  //             return res.status(400).json({ success: false, message: 'Quiz ID is required' });
  //         }
  
  //         // Fetch the quiz with all related data
  //         const quiz = await StudentQuiz.findOne({
  //             where: { id: quiz_id },
  //             include: [
  //                 {
  //                     model: StudentQuizQuestion,
  //                     as: 'questions',
  //                     attributes: ['id', 'question_id', 'answer', 'is_correct'],
  //                     include: [
  //                         {
  //                             model: Question,
  //                             as: 'question',
  //                             include: [{
  //                                 model: QuestionTranslation,
  //                                 as: 'translations',
  //                                 where: { language },
  //                                 required: false
  //                             }]
  //                         }
  //                     ]
  //                 },
  //                 {
  //                     model: Lesson,
  //                     as: 'lesson',
  //                     attributes: ['id'],
  //                     include: [{
  //                         model: LessonTranslation,
  //                         as: 'translations',
  //                         where: { language },
  //                         required: false,
  //                         attributes: ['title']
  //                     }],
  //                     required: false
  //                 },
  //                 {
  //                     model: Unit,
  //                     as: 'unit',
  //                     attributes: ['id'],
  //                     include: [{
  //                         model: UnitTranslation,
  //                         as: 'translations',
  //                         where: { language },
  //                         required: false,
  //                         attributes: ['name']
  //                     }],
  //                     required: false
  //                 },
  //                 {
  //                     model: User,
  //                     as: 'user',
  //                     attributes: ['id', 'username']
  //                 }
  //             ]
  //         });
  
  //         if (!quiz) {
  //             return res.status(404).json({ success: false, message: 'Quiz not found' });
  //         }
  
  //         // Get motivation messages
  //         const answerMotivations = await AnswerMotivation.findAll({
  //             include: [{
  //                 model: AnswerMotivationTranslation,
  //                 as: 'translations',
  //                 where: { language },
  //                 required: false
  //             }]
  //         });
  
  //         const motivationMap = answerMotivations.reduce((acc, item) => {
  //             const text = item.translations && item.translations.length > 0 
  //                 ? item.translations[0].text 
  //                 : item.answer_type === 'correct' ? 'Correct!' : 'Try again!';
  //             acc[item.answer_type] = text;
  //             return acc;
  //         }, {});
  
  //         // Format the response
  //         const reviewData = {
  //             quiz_id: quiz.id,
  //             quiz_type: quiz.unit_id ? 'unit' : 'lesson',
  //             quiz_title: quiz.unit_id 
  //                 ? quiz.unit.translations?.[0]?.name || `Unit Quiz`
  //                 : quiz.lesson.translations?.[0]?.title || `Lesson Quiz`,
  //             user_id: quiz.user_id,
  //             username: quiz.user?.username || 'Unknown',
  //             score: quiz.score,
  //             total_questions: quiz.questions.length,
  //             earned_points: quiz.earned_points,
  //             is_passed: quiz.is_passed,
  //             completed_at: quiz.created_at,
  //             answers: quiz.questions.map(q => {
  //                 const question = q.question;
  //                 const translation = question.translations && question.translations.length > 0 
  //                     ? question.translations[0] 
  //                     : null;
  
  //                 return {
  //                     question_id: question.id,
  //                     question: translation?.question_text || `Question ${question.id}`,
  //                     options: translation?.options || ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  //                     correct_answer: translation?.correct_answer || 'Option 1',
  //                     user_answer: q.answer,
  //                     is_correct: q.is_correct,
  //                     motivation_message: motivationMap[q.is_correct ? 'correct' : 'wrong'],
  //                     hint: translation?.hint || 'No hint available',
  //                     explanation: translation?.explanation || 'No explanation available',
  //                     points: question.points || 0,
  //                     earned_points: q.is_correct ? (question.points || 0) : 0
  //                 };
  //             })
  //         };
  
  //         res.json({ success: true, reviewData });
  //     } catch (error) {
  //         console.error('Error in getQuizReviewDetails:', error);
  //         res.status(500).json({ 
  //             success: false, 
  //             message: 'Server error', 
  //             error: process.env.NODE_ENV === 'development' ? error.message : undefined
  //         });
  //     }
  // }

  static async getQuizReviewDetails(req, res) {
    try {
        const { quiz_id } = req.params;
        const language = req.headers['accept-language'] || 'en';
        
        if (!quiz_id) {
            return res.status(400).json({ 
                success: false, 
                code: 'MISSING_QUIZ_ID',
                message: 'Quiz ID is required' 
            });
        }

        // Fetch the quiz with all related data including translations
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
                                attributes: ['question_text', 'options', 'correct_answer', 'hint']
                            }]
                        }
                    ]
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
                        attributes: ['title']
                    }]
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
                        attributes: ['name']
                    }]
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name']
                }
            ]
        });

        if (!quiz) {
            return res.status(404).json({ 
                success: false, 
                code: 'QUIZ_NOT_FOUND',
                message: 'Quiz not found' 
            });
        }

        // Get motivation messages in the requested language
        const answerMotivations = await AnswerMotivation.findAll({
            include: [{
                model: AnswerMotivationTranslation,
                as: 'translations',
                where: { language },
                required: false
            }]
        });

        const motivationMap = answerMotivations.reduce((acc, motivation) => {
            const text = motivation.translations?.[0]?.text || 
                        (motivation.answer_type === 'correct' ? 'Correct!' : 'Try again!');
            acc[motivation.answer_type] = text;
            return acc;
        }, {});

        // Format the response data
        const reviewData = {
            quiz_id: quiz.id,
            quiz_type: quiz.unit_id ? 'unit' : 'lesson',
            quiz_title: quiz.unit_id 
                ? quiz.unit.translations?.[0]?.name || `Unit Quiz`
                : quiz.lesson.translations?.[0]?.title || `Lesson Quiz`,
            user_id: quiz.user_id,
            username: quiz.user?.name || 'Anonymous',
            score: quiz.score || 0,
            total_questions: quiz.questions?.length || 0,
            earned_points: quiz.earned_points || 0,
            is_passed: Boolean(quiz.is_passed),
            completed_at: quiz.created_at,
            percentage: Math.round(((quiz.score || 0) / (quiz.questions?.length || 1)) * 100),
            answers: quiz.questions?.map(q => {
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
                    earned_points: q.is_correct ? (question.points || 0) : 0
                };
            }) || []
        };

        res.json({ 
            success: true, 
            reviewData 
        });

    } catch (error) {
        console.error('Error in getQuizReviewDetails:', error);
        res.status(500).json({ 
            success: false, 
            code: 'SERVER_ERROR',
            message: 'Failed to fetch quiz review',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}



    static async checkLessonAccess(req, res) {
        try {
          const { user_id, lesson_id, unit_id } = req.params; // Add unit_id as an optional parameter
          if (!user_id) return res.status(400).json({ success: false, message: 'User ID is required' });
      
          // Case 1: Checking access for a unit quiz (unit_id provided, no lesson_id)
          if (unit_id && !lesson_id) {
            const currentUnit = await Unit.findOne({ where: { id: unit_id } });
            if (!currentUnit) return res.status(404).json({ success: false, message: 'Unit not found' });
      
            // Find the last lesson in the unit (highest id or latest created_at)
            const lastLessonInUnit = await Lesson.findOne({
              where: { unit_id: currentUnit.id },
              order: [['id', 'DESC']], // Use 'created_at' instead of 'id' if preferred
            });
      
            if (!lastLessonInUnit) {
              return res.status(404).json({ success: false, message: 'No lessons found in this unit.' });
            }
      
            // Check if the user has passed the quiz for the last lesson
            const lastLessonQuiz = await StudentQuiz.findOne({
              where: { user_id, lesson_id: lastLessonInUnit.id, is_passed: true },
            });
      
            if (!lastLessonQuiz) {
              return res.status(403).json({
                success: false,
                message: 'You must pass the last lesson quiz in this unit to access the unit quiz.',
              });
            }
      
            return res.json({ success: true, message: 'Access granted to unit quiz.' });
          }
      
          // Case 2: Checking access for a lesson (lesson_id provided)
          if (!lesson_id) return res.status(400).json({ success: false, message: 'Lesson ID is required for lesson access' });
      
          const currentLesson = await Lesson.findOne({ where: { id: lesson_id } });
          if (!currentLesson) return res.status(404).json({ success: false, message: 'Lesson not found' });
      
          const currentUnit = await Unit.findOne({ where: { id: currentLesson.unit_id } });
          if (!currentUnit) return res.status(404).json({ success: false, message: 'Unit not found' });
      
          // Step 1: Determine if this is the first lesson in the unit
          const firstLessonInUnit = await Lesson.findOne({
            where: { unit_id: currentLesson.unit_id },
            order: [['id', 'ASC']], // Use 'created_at' instead of 'id' if preferred
          });
          const isFirstLessonInUnit = firstLessonInUnit.id === currentLesson.id;
      
          // Step 2: Determine if this is the first unit in the section
          const firstUnitInSection = await Unit.findOne({
            where: { section_id: currentUnit.section_id },
            order: [['id', 'ASC']], // Use 'created_at' instead of 'id' if preferred
          });
          const isFirstUnitInSection = firstUnitInSection.id === currentUnit.id;
      
          // Step 3: If this is the very first lesson in the course, grant access
          if (isFirstLessonInUnit && isFirstUnitInSection) {
            return res.json({ success: true, message: 'Access granted (first lesson of the course).' });
          }
      
          // Step 4: If this is the first lesson in a unit (but not the first unit), check the previous unit's quiz
          if (isFirstLessonInUnit && !isFirstUnitInSection) {
            const previousUnit = await Unit.findOne({
              where: { section_id: currentUnit.section_id, id: { [Op.lt]: currentUnit.id } },
              order: [['id', 'DESC']], // Get the unit just before this one
            });
            if (previousUnit) {
              const unitQuiz = await StudentQuiz.findOne({
                where: { user_id, unit_id: previousUnit.id, is_passed: true },
              });
              if (!unitQuiz) {
                return res.status(403).json({
                  success: false,
                  message: 'You must pass the previous unit quiz to continue.',
                });
              }
            }
          }
      
          // Step 5: If this is not the first lesson in the unit, check the previous lesson's quiz
          if (!isFirstLessonInUnit) {
            const previousLesson = await Lesson.findOne({
              where: { unit_id: currentLesson.unit_id, id: { [Op.lt]: currentLesson.id } },
              order: [['id', 'DESC']], // Get the lesson just before this one in the same unit
            });
            if (previousLesson) {
              const lessonQuiz = await StudentQuiz.findOne({
                where: { user_id, lesson_id: previousLesson.id, is_passed: true },
              });
              if (!lessonQuiz) {
                return res.status(403).json({
                  success: false,
                  message: 'You must pass the previous lesson quiz to continue.',
                });
              }
            }
          }
      
          // If all conditions pass, grant access to the lesson
          res.json({ success: true, message: 'Access granted.' });
        } catch (error) {
          console.error('Error in checkLessonAccess:', error);
          res.status(500).json({ success: false, message: 'Server error', error: error.message });
        }
      }

}

module.exports = QuizController;