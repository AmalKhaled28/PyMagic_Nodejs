// const { Question, StudentQuiz, StudentQuizQuestion, AnswerMotivation } = require('../models');
// const { Op, Sequelize } = require('sequelize');

// class QuizController {

//   static async getQuizQuestions(req, res) {
//     try {
//       const { id } = req.params;
//       if (!id) return res.status(400).json({ success: false, message: 'Lesson ID is required' });

//       const quizQuestions = await Question.findAll({
//         where: { lesson_id: id, level: { [Op.in]: ['easy', 'medium', 'hard'] } },
//         order: Sequelize.literal('RAND()'),
//       });

//       const selectedQuestions = {
//         easy: quizQuestions.filter(q => q.level === 'easy').slice(0, 3),
//         medium: quizQuestions.filter(q => q.level === 'medium').slice(0, 4),
//         hard: quizQuestions.filter(q => q.level === 'hard').slice(0, 3),
//       };

//       res.json({ success: true, questions: [...selectedQuestions.easy, ...selectedQuestions.medium, ...selectedQuestions.hard] });
//     } catch (error) {
//       console.error('Error in getQuizQuestions:', error);
//       res.status(500).json({ success: false, message: 'Server error', error: error.message });
//     }
//   }

//   static async submitQuiz(req, res) {
//     try {
//       const { user_id, lesson_id, answers } = req.body;

//       if (!user_id || !lesson_id || !Array.isArray(answers)) {
//         return res.status(400).json({ success: false, message: 'Invalid input data' });
//       }

//       let score = 0, earnedPoints = 0;

//       const quiz = await StudentQuiz.create({ user_id, lesson_id, score: 0, earned_points: 0, is_passed: false });

//       const questions = await Question.findAll({
//         where: { id: { [Op.in]: answers.map(ans => ans.question_id) } }
//       });

//       const answerMotivations = await AnswerMotivation.findAll();
//       const motivationMap = answerMotivations.reduce((acc, item) => {
//         acc[item.answer_type] = item.text;
//         return acc;
//       }, {});

//       for (const ans of answers) {
//         const question = questions.find(q => q.id === ans.question_id);
//         if (!question) continue;

//         const isCorrect = question.correct_answer === ans.answer;
//         if (isCorrect) {
//           score += 1;
//           earnedPoints += question.points;
//         }

//         await StudentQuizQuestion.create({
//           quiz_id: quiz.id,
//           question_id: ans.question_id,
//           answer: ans.answer,
//           is_correct: isCorrect
//         });

//         ans.motivation_message = motivationMap[isCorrect ? 'correct' : 'wrong'] || 'Keep trying!';
//       }

//       const isPassed = score >= 5;
//       await quiz.update({ score, earned_points: earnedPoints, is_passed: isPassed });

//       res.json({ success: true, score, earned_points: earnedPoints, is_passed: isPassed, answers });
//     } catch (error) {
//       console.error('Error in submitQuiz:', error);
//       res.status(500).json({ success: false, message: 'Server error', error: error.message });
//     }
//   }

//   static async getUnitQuiz(req, res) {
//     try {
//       const { user_id, unit_id } = req.params;
//       if (!user_id || !unit_id) return res.status(400).json({ success: false, message: 'User ID and Unit ID are required' });

//       const quizzes = await StudentQuiz.findAll({ where: { user_id, unit_id } });
//       let selectedQuestions = [];

//       for (const quiz of quizzes) {
//         let limit = quiz.score < 6 ? 5 : quiz.score <= 7 ? 3 : 2;
//         const questions = await Question.findAll({
//           where: { lesson_id: quiz.lesson_id },
//           order: Sequelize.literal('RAND()'),
//           limit
//         });
//         selectedQuestions.push(...questions);
//       }

//       res.json({ success: true, questions: selectedQuestions });
//     } catch (error) {
//       console.error('Error in getUnitQuiz:', error);
//       res.status(500).json({ success: false, message: 'Server error', error: error.message });
//     }
//   }

//   static async checkLessonAccess(req, res) {
//     try {
//       const { user_id, lesson_id } = req.params;
//       if (!user_id || !lesson_id) return res.status(400).json({ success: false, message: 'User ID and Lesson ID are required' });

//       const quiz = await StudentQuiz.findOne({ where: { user_id, lesson_id } });
//       if (!quiz || !quiz.is_passed) {
//         return res.status(403).json({ success: false, message: 'You must pass the previous lesson quiz to continue.' });
//       }

//       res.json({ success: true, message: 'Access granted.' });
//     } catch (error) {
//       console.error('Error in checkLessonAccess:', error);
//       res.status(500).json({ success: false, message: 'Server error', error: error.message });
//     }
//   }
// }

// module.exports = QuizController;


const { Question, StudentQuiz, StudentQuizQuestion, AnswerMotivation, Lesson } = require('../models');
const { Op, Sequelize } = require('sequelize');

class QuizController {


    static async getQuizQuestions(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ success: false, message: 'Lesson ID is required' });
            console.log('lesson_id', id);
            
            const quizQuestions = await Question.findAll({
                where: { lesson_id: id, level: { [Op.in]: ['easy', 'medium', 'hard'] } },
                order: Sequelize.literal('RAND()'),
            });

            const selectedQuestions = {
                easy: quizQuestions.filter(q => q.level === 'easy').slice(0, 3),
                medium: quizQuestions.filter(q => q.level === 'medium').slice(0, 4),
                hard: quizQuestions.filter(q => q.level === 'hard').slice(0, 3),
            };

            const questions = [...selectedQuestions.easy, ...selectedQuestions.medium, ...selectedQuestions.hard];
            res.json({ success: true, questions });
        } catch (error) {
            console.error('Error in getQuizQuestions:', error);
            res.status(500).json({ success: false, message: 'Server error', error: error.message });
        }
    }

    static async submitQuiz(req, res) {
        try {
            const { user_id, lesson_id, answers } = req.body;
            
            if (!user_id || !lesson_id || !Array.isArray(answers)) {
                return res.status(400).json({ success: false, message: 'Invalid input data' });
            }

            let score = 0, earnedPoints = 0;

            const quiz = await StudentQuiz.create({ user_id, lesson_id, score: 0, earned_points: 0, is_passed: false });
            
            const questions = await Question.findAll({
                where: { id: { [Op.in]: answers.map(ans => ans.question_id) } }
            });

            const answerMotivations = await AnswerMotivation.findAll();
            const motivationMap = answerMotivations.reduce((acc, item) => {
                acc[item.answer_type] = item.text;
                return acc;
            }, {});

            for (const ans of answers) {
                const question = questions.find(q => q.id === ans.question_id);
                if (!question) continue;

                const isCorrect = question.correct_answer === ans.selected_answer;
                if (isCorrect) {
                    score += 1;
                    earnedPoints += question.points;
                }

                await StudentQuizQuestion.create({
                    quiz_id: quiz.id,
                    question_id: ans.question_id,
                    answer: ans.selected_answer,
                    is_correct: isCorrect
                });

                ans.motivation_message = motivationMap[isCorrect ? 'correct' : 'wrong'] || 'Keep trying!';
            }

            const isPassed = score >= 5;
            await quiz.update({ score, earned_points: earnedPoints, is_passed: isPassed });

            res.json({ success: true, score, earned_points: earnedPoints, is_passed: isPassed, answers });
        } catch (error) {
            console.error('Error in submitQuiz:', error);
            res.status(500).json({ success: false, message: 'Server error', error: error.message });
        }
    }


////////////////////////////////////////



///
static async getUnitQuiz(req, res) {
    try {
        const { user_id, unit_id } = req.params;
        if (!user_id || !unit_id) {
            return res.status(400).json({ success: false, message: 'User ID and Unit ID are required' });
        }

        // جلب جميع الدروس داخل الوحدة
        const lessons = await Lesson.findAll({
            where: { unit_id },
            attributes: ['id']
        });

        if (!lessons.length) {
            return res.status(404).json({ success: false, message: 'No lessons found for this unit' });
        }

        const lessonIds = lessons.map(lesson => lesson.id);

        // جلب نتائج المستخدم في هذه الدروس
        const quizzes = await StudentQuiz.findAll({
            where: { user_id, lesson_id: { [Op.in]: lessonIds } },
            attributes: ['lesson_id', 'score']
        });

        if (!quizzes.length) {
            return res.json({ success: true, questions: [] }); // لا يوجد نتائج لهذا المستخدم
        }

        let selectedQuestions = [];
        for (const quiz of quizzes) {
            const limit = quiz.score < 6 ? 5 : quiz.score <= 7 ? 3 : 2;

            const questions = await Question.findAll({
                where: { lesson_id: quiz.lesson_id },
                order: Sequelize.literal('RAND()'),
                limit
            });

            selectedQuestions.push(...questions);
        }

        res.json({ success: true, questions: selectedQuestions });
    } catch (error) {
        console.error('Error in getUnitQuiz:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}


///////////////////////////////

static async submitUnitQuiz(req, res) {
    try {
        const { user_id, unit_id, answers } = req.body;

        // التحقق من البيانات المدخلة
        if (!user_id || !unit_id || !Array.isArray(answers)) {
            return res.status(400).json({ success: false, message: 'Invalid input data' });
        }

        let score = 0, earnedPoints = 0;

        // إنشاء سجل الـ unit quiz في الـ database
        const unitQuiz = await StudentQuiz.create({
            user_id,
            unit_id,
            score: 0,
            earned_points: 0,
            is_passed: false
        });

        // جلب الأسئلة من الـ database
        const questions = await Question.findAll({
            where: { id: { [Op.in]: answers.map(ans => ans.question_id) } }
        });

        // جلب الرسائل التحفيزية
        const answerMotivations = await AnswerMotivation.findAll();
        const motivationMap = answerMotivations.reduce((acc, item) => {
            acc[item.answer_type] = item.text;
            return acc;
        }, {});

        // تصحيح الإجابات وحساب الـ score
        for (const ans of answers) {
            const question = questions.find(q => q.id === ans.question_id);
            if (!question) {
                console.warn(`Question with ID ${ans.question_id} not found.`);
                continue;
            }

            // تحويل الإجابات إلى أحرف صغيرة لتجنب مشكلة الحساسية
            const isCorrect = question.correct_answer.toLowerCase() === ans.user_answer.toLowerCase();

            // إذا كانت الإجابة صحيحة، زيادة النقاط
            if (isCorrect) {
                score += 1; // زيادة عدد الإجابات الصحيحة
                earnedPoints += question.points || 0; // زيادة النقاط المكتسبة
                console.log(`Correct answer for question ${ans.question_id}. Points added: ${question.points}`);
            } else {
                console.log(`Incorrect answer for question ${ans.question_id}. Correct answer: ${question.correct_answer}, User answer: ${ans.user_answer}`);
            }

            // تسجيل إجابة الطالب في الـ database
            await StudentQuizQuestion.create({
                quiz_id: unitQuiz.id,
                question_id: ans.question_id,
                answer: ans.user_answer,
                is_correct: isCorrect
            });

            // إضافة رسالة تحفيزية للإجابة
            ans.motivation_message = motivationMap[isCorrect ? 'correct' : 'wrong'] || 'Keep trying!';
        }

        // تحديد إذا كان الطالب قد نجح في الـ unit quiz
        const isPassed = score >= 5;
        await unitQuiz.update({ score, earned_points: earnedPoints, is_passed: isPassed });

        // إرسال الرد النهائي
        res.json({
            success: true,
            score,
            earned_points: earnedPoints,
            is_passed: isPassed,
            answers
        });
    } catch (error) {
        console.error('Error in submitUnitQuiz:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

///




  static async checkLessonAccess(req, res) {
    try {
        const { user_id, lesson_id } = req.params;
        if (!user_id || !lesson_id) {
            return res.status(400).json({ success: false, message: 'User ID and Lesson ID are required' });
        }

        // Get the previous lesson ID
        const previousLessonId = parseInt(lesson_id) - 1;
        if (previousLessonId <= 0) {
            return res.json({ success: true, message: 'Access granted.' }); // First lesson has no prerequisite
        }

        // Check if the user has passed the previous lesson's quiz
        const previousQuiz = await StudentQuiz.findOne({ where: { user_id, lesson_id: previousLessonId } });

        if (!previousQuiz || !previousQuiz.is_passed) {
            return res.status(403).json({ success: false, message: 'You must pass the previous lesson quiz to continue.' });
        }

        res.json({ success: true, message: 'Access granted.' });
    } catch (error) {
        console.error('Error in checkLessonAccess:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

}

module.exports = QuizController;
