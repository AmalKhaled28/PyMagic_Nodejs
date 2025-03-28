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

//last update 2021-09-29 by amal
// const { Question, StudentQuiz, StudentQuizQuestion, AnswerMotivation, Lesson } = require('../models');
// const { Op, Sequelize } = require('sequelize');

// class QuizController {


//     static async getQuizQuestions(req, res) {
//         try {
//             const { id } = req.params;
//             if (!id) return res.status(400).json({ success: false, message: 'Lesson ID is required' });
//             console.log('lesson_id', id);
            
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

//     static async submitQuiz(req, res) {
//         try {
//             const { user_id, lesson_id, answers } = req.body;
            
//             if (!user_id || !lesson_id || !Array.isArray(answers)) {
//                 return res.status(400).json({ success: false, message: 'Invalid input data' });
//             }

//             let score = 0, earnedPoints = 0;

//             const quiz = await StudentQuiz.create({ user_id, lesson_id, score: 0, earned_points: 0, is_passed: false });
            
//             const questions = await Question.findAll({
//                 where: { id: { [Op.in]: answers.map(ans => ans.question_id) } }
//             });

//             const answerMotivations = await AnswerMotivation.findAll();
//             const motivationMap = answerMotivations.reduce((acc, item) => {
//                 acc[item.answer_type] = item.text;
//                 return acc;
//             }, {});

//             for (const ans of answers) {
//                 const question = questions.find(q => q.id === ans.question_id);
//                 if (!question) continue;

//                 const isCorrect = question.correct_answer === ans.selected_answer;
//                 if (isCorrect) {
//                     score += 1;
//                     earnedPoints += question.points;
//                 }

//                 await StudentQuizQuestion.create({
//                     quiz_id: quiz.id,
//                     question_id: ans.question_id,
//                     answer: ans.selected_answer,
//                     is_correct: isCorrect
//                 });

//                 ans.motivation_message = motivationMap[isCorrect ? 'correct' : 'wrong'] || 'Keep trying!';
//             }

//             const isPassed = score >= 5;
//             await quiz.update({ score, earned_points: earnedPoints, is_passed: isPassed });

//             res.json({ success: true, score, earned_points: earnedPoints, is_passed: isPassed, answers });
//         } catch (error) {
//             console.error('Error in submitQuiz:', error);
//             res.status(500).json({ success: false, message: 'Server error', error: error.message });
//         }
//     }


// ////////////////////////////////////////



// ///
// static async getUnitQuiz(req, res) {
//     try {
//         const { user_id, unit_id } = req.params;
//         if (!user_id || !unit_id) {
//             return res.status(400).json({ success: false, message: 'User ID and Unit ID are required' });
//         }

//         // جلب جميع الدروس داخل الوحدة
//         const lessons = await Lesson.findAll({
//             where: { unit_id },
//             attributes: ['id']
//         });

//         if (!lessons.length) {
//             return res.status(404).json({ success: false, message: 'No lessons found for this unit' });
//         }

//         const lessonIds = lessons.map(lesson => lesson.id);

//         // جلب نتائج المستخدم في هذه الدروس
//         const quizzes = await StudentQuiz.findAll({
//             where: { user_id, lesson_id: { [Op.in]: lessonIds } },
//             attributes: ['lesson_id', 'score']
//         });

//         if (!quizzes.length) {
//             return res.json({ success: true, questions: [] }); // لا يوجد نتائج لهذا المستخدم
//         }

//         let selectedQuestions = [];
//         for (const quiz of quizzes) {
//             const limit = quiz.score < 6 ? 5 : quiz.score <= 7 ? 3 : 2;

//             const questions = await Question.findAll({
//                 where: { lesson_id: quiz.lesson_id },
//                 order: Sequelize.literal('RAND()'),
//                 limit
//             });

//             selectedQuestions.push(...questions);
//         }

//         res.json({ success: true, questions: selectedQuestions });
//     } catch (error) {
//         console.error('Error in getUnitQuiz:', error);
//         res.status(500).json({ success: false, message: 'Server error', error: error.message });
//     }
// }


// ///////////////////////////////

// static async submitUnitQuiz(req, res) {
//     try {
//         const { user_id, unit_id, answers } = req.body;

//         // التحقق من البيانات المدخلة
//         if (!user_id || !unit_id || !Array.isArray(answers)) {
//             return res.status(400).json({ success: false, message: 'Invalid input data' });
//         }

//         let score = 0, earnedPoints = 0;

//         // إنشاء سجل الـ unit quiz في الـ database
//         const unitQuiz = await StudentQuiz.create({
//             user_id,
//             unit_id,
//             score: 0,
//             earned_points: 0,
//             is_passed: false
//         });

//         // جلب الأسئلة من الـ database
//         const questions = await Question.findAll({
//             where: { id: { [Op.in]: answers.map(ans => ans.question_id) } }
//         });

//         // جلب الرسائل التحفيزية
//         const answerMotivations = await AnswerMotivation.findAll();
//         const motivationMap = answerMotivations.reduce((acc, item) => {
//             acc[item.answer_type] = item.text;
//             return acc;
//         }, {});

//         // تصحيح الإجابات وحساب الـ score
//         for (const ans of answers) {
//             const question = questions.find(q => q.id === ans.question_id);
//             if (!question) {
//                 console.warn(`Question with ID ${ans.question_id} not found.`);
//                 continue;
//             }

//             // تحويل الإجابات إلى أحرف صغيرة لتجنب مشكلة الحساسية
//             const isCorrect = question.correct_answer.toLowerCase() === ans.user_answer.toLowerCase();

//             // إذا كانت الإجابة صحيحة، زيادة النقاط
//             if (isCorrect) {
//                 score += 1; // زيادة عدد الإجابات الصحيحة
//                 earnedPoints += question.points || 0; // زيادة النقاط المكتسبة
//                 console.log(`Correct answer for question ${ans.question_id}. Points added: ${question.points}`);
//             } else {
//                 console.log(`Incorrect answer for question ${ans.question_id}. Correct answer: ${question.correct_answer}, User answer: ${ans.user_answer}`);
//             }

//             // تسجيل إجابة الطالب في الـ database
//             await StudentQuizQuestion.create({
//                 quiz_id: unitQuiz.id,
//                 question_id: ans.question_id,
//                 answer: ans.user_answer,
//                 is_correct: isCorrect
//             });

//             // إضافة رسالة تحفيزية للإجابة
//             ans.motivation_message = motivationMap[isCorrect ? 'correct' : 'wrong'] || 'Keep trying!';
//         }

//         // تحديد إذا كان الطالب قد نجح في الـ unit quiz
//         const isPassed = score >= 5;
//         await unitQuiz.update({ score, earned_points: earnedPoints, is_passed: isPassed });

//         // إرسال الرد النهائي
//         res.json({
//             success: true,
//             score,
//             earned_points: earnedPoints,
//             is_passed: isPassed,
//             answers
//         });
//     } catch (error) {
//         console.error('Error in submitUnitQuiz:', error);
//         res.status(500).json({ success: false, message: 'Server error', error: error.message });
//     }
// }

// ///




//   static async checkLessonAccess(req, res) {
//     try {
//         const { user_id, lesson_id } = req.params;
//         if (!user_id || !lesson_id) {
//             return res.status(400).json({ success: false, message: 'User ID and Lesson ID are required' });
//         }

//         // Get the previous lesson ID
//         const previousLessonId = parseInt(lesson_id) - 1;
//         if (previousLessonId <= 0) {
//             return res.json({ success: true, message: 'Access granted.' }); // First lesson has no prerequisite
//         }

//         // Check if the user has passed the previous lesson's quiz
//         const previousQuiz = await StudentQuiz.findOne({ where: { user_id, lesson_id: previousLessonId } });

//         if (!previousQuiz || !previousQuiz.is_passed) {
//             return res.status(403).json({ success: false, message: 'You must pass the previous lesson quiz to continue.' });
//         }

//         res.json({ success: true, message: 'Access granted.' });
//     } catch (error) {
//         console.error('Error in checkLessonAccess:', error);
//         res.status(500).json({ success: false, message: 'Server error', error: error.message });
//     }
// }

// }

// module.exports = QuizController;






// controllers/quizController.js
const { Question, StudentQuiz, StudentQuizQuestion, AnswerMotivation, Lesson, Unit, User } = require('../models');
const { Op, Sequelize } = require('sequelize');
const AchievementController = require('./achievementController'); // Import AchievementController

class QuizController {
    // Existing getQuizQuestions (Lesson Quiz)
    static async getQuizQuestions(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json({ success: false, message: 'Lesson ID is required' });

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

    // Existing submitQuiz (Lesson Quiz)
    // controllers/quizController.js
// controllers/quizController.js
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

//         res.json({ 
//             success: true, 
//             score, 
//             earned_points: earnedPoints, 
//             is_passed: isPassed, 
//             answers: detailedAnswers // Return detailed answers for review
//         });
//     } catch (error) {
//         console.error('Error in submitQuiz:', error);
//         res.status(500).json({ success: false, message: 'Server error', error: error.message });
//     }
// }

static async submitQuiz(req, res) {
    try {
        const { user_id, lesson_id, answers } = req.body;
        
        console.log("Received submitQuiz request:", { user_id, lesson_id, answers });

        if (!user_id || !lesson_id || !Array.isArray(answers) || answers.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid input data' });
        }

        let score = 0, earnedPoints = 0;

        const quiz = await StudentQuiz.create({ 
            user_id, 
            lesson_id, 
            score: 0, 
            earned_points: 0, 
            is_passed: false 
        });
        
        // Fetch questions without including StudentQuizQuestion initially
        const questionIds = answers.map(ans => parseInt(ans.question_id, 10));
        const questions = await Question.findAll({
            where: { id: { [Op.in]: questionIds } }
        });

        console.log("Fetched questions:", questions);

        if (!questions || questions.length === 0) {
            return res.status(404).json({ success: false, message: 'No questions found for the provided IDs' });
        }

        const answerMotivations = await AnswerMotivation.findAll();
        const motivationMap = answerMotivations.reduce((acc, item) => {
            acc[item.answer_type] = item.text;
            return acc;
        }, {});

        const detailedAnswers = [];

        for (const ans of answers) {
            const question = questions.find(q => q.id === parseInt(ans.question_id, 10));
            if (!question) {
                console.warn(`Question with ID ${ans.question_id} not found. Skipping...`);
                continue;
            }

            console.log(`Checking answer for question ${ans.question_id}:`, { selected_answer: ans.selected_answer, correct_answer: question.correct_answer });

            const isCorrect = question.correct_answer === ans.selected_answer;
            if (isCorrect) {
                score += 1;
                earnedPoints += question.points || 0; // Ensure points exist, default to 0 if not
            }

            await StudentQuizQuestion.create({
                quiz_id: quiz.id,
                question_id: question.id,
                answer: ans.selected_answer,
                is_correct: isCorrect
            });

            const detailedAnswer = {
                question_id: question.id,
                question: question.question,
                options: question.options,
                correct_answer: question.correct_answer,
                user_answer: ans.selected_answer,
                is_correct: isCorrect,
                motivation_message: motivationMap[isCorrect ? 'correct' : 'wrong'] || 'Keep trying!'
            };
            detailedAnswers.push(detailedAnswer);
        }

        console.log("Calculated score:", score, "Earned points:", earnedPoints, "Detailed answers:", detailedAnswers);

        const isPassed = score >= 5;
        await quiz.update({ score, earned_points: earnedPoints, is_passed: isPassed });

        // Update user's earned_points in the User table
        const user = await User.findByPk(user_id);
        if (user) {
            user.earned_points += earnedPoints; // Add the earned points to the existing total
            await user.save();
        }

        // Check and unlock achievements after updating points
        await AchievementController.checkAndUnlockAchievements({ params: { userId: user_id } }, res);

        res.json({ 
            success: true, 
            score, 
            earned_points: earnedPoints, 
            is_passed: isPassed, 
            total_user_points: user ? user.earned_points : 0, // Return updated total points
            answers: detailedAnswers // Return detailed answers for review
        });
    } catch (error) {
        console.error('Error in submitQuiz:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

    // Enhanced getUnitQuiz
    static async getUnitQuiz(req, res) {
        try {
            const { user_id, unit_id } = req.params;
            if (!user_id || !unit_id) {
                return res.status(400).json({ success: false, message: 'User ID and Unit ID are required' });
            }

            const lessons = await Lesson.findAll({
                where: { unit_id },
                attributes: ['id']
            });

            if (!lessons.length) {
                return res.status(404).json({ success: false, message: 'No lessons found for this unit' });
            }

            const lessonIds = lessons.map(lesson => lesson.id);
            const quizzes = await StudentQuiz.findAll({
                where: { user_id, lesson_id: { [Op.in]: lessonIds } },
                attributes: ['lesson_id', 'score', 'is_passed']
            });

            let selectedQuestions = [];
            if (quizzes.length === 0) {
                // If no previous quizzes, get 10 random questions
                selectedQuestions = await Question.findAll({
                    where: { lesson_id: { [Op.in]: lessonIds } },
                    order: Sequelize.literal('RAND()'),
                    limit: 10
                });
            } else {
                for (const quiz of quizzes) {
                    const limit = quiz.score < 6 ? 5 : quiz.score <= 7 ? 3 : 2;
                    const questions = await Question.findAll({
                        where: { lesson_id: quiz.lesson_id },
                        order: Sequelize.literal('RAND()'),
                        limit
                    });
                    selectedQuestions.push(...questions);
                }
            }

            res.json({ success: true, questions: selectedQuestions });
        } catch (error) {
            console.error('Error in getUnitQuiz:', error);
            res.status(500).json({ success: false, message: 'Server error', error: error.message });
        }
    }

    // Enhanced submitUnitQuiz
    // controllers/quizController.js
// static async submitUnitQuiz(req, res) {
//     try {
//         const { user_id, unit_id, answers } = req.body;

//         console.log("Received submitUnitQuiz request:", { user_id, unit_id, answers }); // Debug log

//         if (!user_id || !unit_id || !Array.isArray(answers) || answers.length === 0) {
//             return res.status(400).json({ success: false, message: 'Invalid input data' });
//         }

//         let score = 0, earnedPoints = 0;

//         const unitQuiz = await StudentQuiz.create({
//             user_id,
//             unit_id,
//             score: 0,
//             earned_points: 0,
//             is_passed: false
//         });

//         // Fetch questions without including StudentQuizQuestion initially (similar to submitQuiz fix)
//         const questionIds = answers.map(ans => parseInt(ans.question_id, 10));
//         const questions = await Question.findAll({
//             where: { id: { [Op.in]: questionIds } }
//         });

//         console.log("Fetched questions for unit quiz:", questions); // Debug log

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

//             console.log(`Checking answer for question ${ans.question_id}:`, { user_answer: ans.user_answer, correct_answer: question.correct_answer }); // Debug log

//             const isCorrect = question.correct_answer.toLowerCase() === ans.user_answer.toLowerCase(); // Case-insensitive comparison
//             if (isCorrect) {
//                 score += 1;
//                 earnedPoints += question.points || 0; // Ensure points exist, default to 0 if not
//             }

//             await StudentQuizQuestion.create({
//                 quiz_id: unitQuiz.id,
//                 question_id: question.id,
//                 answer: ans.user_answer,
//                 is_correct: isCorrect
//             });

//             const detailedAnswer = {
//                 question_id: question.id,
//                 question: question.question,
//                 options: question.options,
//                 correct_answer: question.correct_answer,
//                 user_answer: ans.user_answer,
//                 is_correct: isCorrect,
//                 motivation_message: motivationMap[isCorrect ? 'correct' : 'wrong'] || 'Keep trying!'
//             };
//             detailedAnswers.push(detailedAnswer);
//         }

//         console.log("Calculated score for unit quiz:", score, "Earned points:", earnedPoints, "Detailed answers:", detailedAnswers); // Debug log

//         const isPassed = score >= questions.length / 2; // Assume passing score is 50%
//         await unitQuiz.update({ score, earned_points: earnedPoints, is_passed: isPassed });

//         res.json({
//             success: true,
//             score,
//             earned_points: earnedPoints,
//             is_passed: isPassed,
//             answers: detailedAnswers // Return detailed answers for review
//         });
//     } catch (error) {
//         console.error('Error in submitUnitQuiz:', error);
//         res.status(500).json({ success: false, message: 'Server error', error: error.message });
//     }
// }


static async submitUnitQuiz(req, res) {
    try {
        const { user_id, unit_id, answers } = req.body;

        console.log("Received submitUnitQuiz request:", { user_id, unit_id, answers }); // Debug log

        if (!user_id || !unit_id || !Array.isArray(answers) || answers.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid input data' });
        }

        let score = 0, earnedPoints = 0;

        const unitQuiz = await StudentQuiz.create({
            user_id,
            unit_id,
            score: 0,
            earned_points: 0,
            is_passed: false
        });

        // Fetch questions without including StudentQuizQuestion initially
        const questionIds = answers.map(ans => parseInt(ans.question_id, 10));
        const questions = await Question.findAll({
            where: { id: { [Op.in]: questionIds } }
        });

        console.log("Fetched questions for unit quiz:", questions); // Debug log

        if (!questions || questions.length === 0) {
            return res.status(404).json({ success: false, message: 'No questions found for the provided IDs' });
        }

        const answerMotivations = await AnswerMotivation.findAll();
        const motivationMap = answerMotivations.reduce((acc, item) => {
            acc[item.answer_type] = item.text;
            return acc;
        }, {});

        const detailedAnswers = [];

        for (const ans of answers) {
            const question = questions.find(q => q.id === parseInt(ans.question_id, 10));
            if (!question) {
                console.warn(`Question with ID ${ans.question_id} not found. Skipping...`);
                continue;
            }

            console.log(`Checking answer for question ${ans.question_id}:`, { user_answer: ans.user_answer, correct_answer: question.correct_answer }); // Debug log

            const isCorrect = question.correct_answer.toLowerCase() === ans.user_answer.toLowerCase(); // Case-insensitive comparison
            if (isCorrect) {
                score += 1;
                earnedPoints += question.points || 0; // Ensure points exist, default to 0 if not
            }

            await StudentQuizQuestion.create({
                quiz_id: unitQuiz.id,
                question_id: question.id,
                answer: ans.user_answer,
                is_correct: isCorrect
            });

            const detailedAnswer = {
                question_id: question.id,
                question: question.question,
                options: question.options,
                correct_answer: question.correct_answer,
                user_answer: ans.user_answer,
                is_correct: isCorrect,
                motivation_message: motivationMap[isCorrect ? 'correct' : 'wrong'] || 'Keep trying!'
            };
            detailedAnswers.push(detailedAnswer);
        }

        console.log("Calculated score for unit quiz:", score, "Earned points:", earnedPoints, "Detailed answers:", detailedAnswers); // Debug log

        const isPassed = score >= questions.length / 2; // Assume passing score is 50%
        await unitQuiz.update({ score, earned_points: earnedPoints, is_passed: isPassed });

        // Update user's earned_points in the User table
        const user = await User.findByPk(user_id);
        if (user) {
            user.earned_points += earnedPoints; // Add the earned points to the existing total
            await user.save();
        } else {
            throw new Error("User not found");
        }

        // Check and unlock achievements after updating points
        // Pass req and res objects instead of a custom object
        const achievementResponse = await AchievementController.checkAndUnlockAchievements(req, res);
        const newAchievements = achievementResponse.achievements || []; // Ensure achievements are returned

        // If the response was already sent in checkAndUnlockAchievements, do not send another response here
        if (!res.headersSent) {
            res.json({
                success: true,
                score,
                earned_points: earnedPoints,
                is_passed: isPassed,
                total_user_points: user ? user.earned_points : 0, // Return updated total points
                answers: detailedAnswers, // Return detailed answers for review
                achievements: newAchievements // Return new achievements
            });
        }
    } catch (error) {
        console.error('Error in submitUnitQuiz:', error);
        let errorMessage = "Server error";
        let errorDetails = error.message || "Unknown error";
        if (error.response && error.response.status) {
            errorMessage = `HTTP Error ${error.response.status}`;
            errorDetails = error.response.data?.message || errorDetails;
        }
        res.status(500).json({ success: false, message: errorMessage, error: errorDetails });
    }
}



    static async getUserQuizProgress(req, res) {
      try {
        const { user_id } = req.params;
        if (!user_id) {
          return res.status(400).json({ success: false, message: 'User ID is required' });
        }
    
        // Fetch all quiz results for the user
        const quizzes = await StudentQuiz.findAll({
          where: { user_id },
          attributes: ['id', 'lesson_id', 'unit_id', 'score', 'earned_points', 'is_passed', 'created_at'],
          include: [
            {
              model: Lesson,
              as: 'lesson',
              attributes: ['id', 'title', 'unit_id'],
              required: false
            },
            {
              model: Unit,
              as: 'unit',
              attributes: ['id', 'name'],
              required: false
            },
            {
              model: StudentQuizQuestion,
              as: 'questions', // Include the questions to count them
              attributes: ['id'], // We only need the ID to count
              required: false
            }
          ],
          order: [['created_at', 'DESC']]
        });
    
        // Group lessons by unit to determine lesson numbers
        const lessonOrderByUnit = {};
        quizzes.forEach(quiz => {
          if (quiz.lesson && quiz.lesson.unit_id) {
            if (!lessonOrderByUnit[quiz.lesson.unit_id]) {
              lessonOrderByUnit[quiz.lesson.unit_id] = [];
            }
            if (!lessonOrderByUnit[quiz.lesson.unit_id].some(l => l.id === quiz.lesson.id)) {
              lessonOrderByUnit[quiz.lesson.unit_id].push({
                id: quiz.lesson.id,
                title: quiz.lesson.title
              });
            }
          }
        });
    
        // Assign lesson numbers and calculate total questions
        const progressData = quizzes.map(quiz => {
          let lessonNumber = null;
          if (quiz.lesson && quiz.lesson.unit_id) {
            const lessonsInUnit = lessonOrderByUnit[quiz.lesson.unit_id];
            lessonNumber = lessonsInUnit.findIndex(l => l.id === quiz.lesson.id) + 1;
          }
    
          // Calculate total questions by counting the associated StudentQuizQuestions
          const totalQuestions = quiz.questions ? quiz.questions.length : 0;
    
          return {
            id: quiz.id,
            lesson_id: quiz.lesson_id ? String(quiz.lesson_id) : null,
            unit_id: quiz.unit_id ? String(quiz.unit_id) : (quiz.lesson ? String(quiz.lesson.unit_id) : null),
            lesson_number: lessonNumber,
            name: quiz.lesson ? quiz.lesson.title : quiz.unit ? quiz.unit.name : 'Unknown',
            score: quiz.score || 0,
            total_questions: totalQuestions || 10, // Fallback to 10 if no questions are found
            earned_points: quiz.earned_points || 0,
            is_passed: quiz.is_passed || false,
            date: quiz.created_at
          };
        });
    
        res.json({ success: true, progress: progressData });
      } catch (error) {
        console.error('Error in getUserQuizProgress:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
      }
    }

  
    
    static async getQuizReviewDetails(req, res) {
        try {
          const { quiz_id } = req.params; // Assuming quiz_id is passed as a parameter
          if (!quiz_id) {
            return res.status(400).json({ success: false, message: 'Quiz ID is required' });
          }
      
          // Fetch the quiz data for the user (including questions and user answers via StudentQuizQuestion)
          const quiz = await StudentQuiz.findOne({
            where: { id: quiz_id },
            include: [
              {
                model: StudentQuizQuestion, // Use StudentQuizQuestion to link to questions
                as: 'questions', // Match the alias from models/index.js
                attributes: ['id', 'question_id', 'answer', 'is_correct'],
                include: [
                  {
                    model: Question, // Include the Question details
                    as: 'question', // Match the alias from models/index.js
                    attributes: ['id', 'question', 'type', 'options', 'correct_answer'], // Use fields from Question model
                  },
                ],
              },
            ],
          });
      
          if (!quiz) {
            return res.status(404).json({ success: false, message: 'Quiz not found' });
          }
      
          // Transform the data into a format suitable for the frontend
          const reviewData = {
            score: quiz.score || 0,
            total_questions: quiz.questions.length,
            earned_points: quiz.earned_points || 0,
            is_passed: quiz.is_passed || false,
            answers: quiz.questions.map((quizQuestion) => {
              const question = quizQuestion.question; // Access the Question data
              return {
                question_id: question.id,
                question: question.question,
                options: question.options || [], // Use the JSON options from Question model
                correct_answer: question.correct_answer || 'No correct answer',
                user_answer: quizQuestion.answer || 'No answer provided',
                isCorrect: quizQuestion.is_correct || false,
              };
            }),
          };
      
          res.json({ success: true, reviewData });
        } catch (error) {
          console.error('Error in getQuizReviewDetails:', error);
          res.status(500).json({ success: false, message: 'Server error', error: error.message });
        }
      }
    

    //   static async checkLessonAccess(req, res) {
    //     try {
    //       const { user_id, lesson_id } = req.params;
    //       if (!user_id || !lesson_id) return res.status(400).json({ success: false, message: 'User ID and Lesson ID are required' });
      
    //       // Fetch the current lesson
    //       const currentLesson = await Lesson.findOne({ where: { id: lesson_id } });
    //       if (!currentLesson) return res.status(404).json({ success: false, message: 'Lesson not found' });
      
    //       // Fetch the unit for the current lesson
    //       const currentUnit = await Unit.findOne({ where: { id: currentLesson.unit_id } });
    //       if (!currentUnit) return res.status(404).json({ success: false, message: 'Unit not found' });
      
    //       // Step 1: Determine if this is the first lesson in the unit
    //       const firstLessonInUnit = await Lesson.findOne({
    //         where: { unit_id: currentLesson.unit_id },
    //         order: [['id', 'ASC']], // Use 'created_at' instead of 'id' if preferred
    //       });
    //       const isFirstLessonInUnit = firstLessonInUnit.id === currentLesson.id;
      
    //       // Step 2: Determine if this is the first unit in the section
    //       const firstUnitInSection = await Unit.findOne({
    //         where: { section_id: currentUnit.section_id },
    //         order: [['id', 'ASC']], // Use 'created_at' instead of 'id' if preferred
    //       });
    //       const isFirstUnitInSection = firstUnitInSection.id === currentUnit.id;
      
    //       // Step 3: If this is the very first lesson in the course (first lesson of first unit), grant access
    //       if (isFirstLessonInUnit && isFirstUnitInSection) {
    //         return res.json({ success: true, message: 'Access granted (first lesson of the course).' });
    //       }
      
    //       // Step 4: If this is the first lesson in a unit (but not the first unit), check the previous unit's quiz
    //       if (isFirstLessonInUnit && !isFirstUnitInSection) {
    //         const previousUnit = await Unit.findOne({
    //           where: { section_id: currentUnit.section_id, id: { [Op.lt]: currentUnit.id } },
    //           order: [['id', 'DESC']], // Get the unit just before this one
    //         });
    //         if (previousUnit) {
    //           const unitQuiz = await StudentQuiz.findOne({
    //             where: { user_id, unit_id: previousUnit.id, is_passed: true },
    //           });
    //           if (!unitQuiz) {
    //             return res.status(403).json({ success: false, message: 'You must pass the previous unit quiz to continue.' });
    //           }
    //         }
    //       }
      
    //       // Step 5: If this is not the first lesson in the unit, check the previous lesson's quiz
    //       if (!isFirstLessonInUnit) {
    //         const previousLesson = await Lesson.findOne({
    //           where: { unit_id: currentLesson.unit_id, id: { [Op.lt]: currentLesson.id } },
    //           order: [['id', 'DESC']], // Get the lesson just before this one in the same unit
    //         });
    //         if (previousLesson) {
    //           const lessonQuiz = await StudentQuiz.findOne({
    //             where: { user_id, lesson_id: previousLesson.id, is_passed: true },
    //           });
    //           if (!lessonQuiz) {
    //             return res.status(403).json({ success: false, message: 'You must pass the previous lesson quiz to continue.' });
    //           }
    //         }
    //       }
      
    //       // If all conditions pass, grant access
    //       res.json({ success: true, message: 'Access granted.' });
    //     } catch (error) {
    //       console.error('Error in checkLessonAccess:', error);
    //       res.status(500).json({ success: false, message: 'Server error', error: error.message });
    //     }
    // }


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