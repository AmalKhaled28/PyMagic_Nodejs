// const express = require('express');
// const QuizController = require('../controllers/quizController');

// const router = express.Router();

// router.get('/lesson/:lesson_id', QuizController.getQuizQuestions);
// router.post('/submit', QuizController.submitQuiz);
// router.get('/unit/:user_id/:unit_id', QuizController.getUnitQuiz);

// module.exports = router;

const express = require('express');
const QuizController = require('../controllers/quizController');

const router = express.Router();

router.get('/lesson/:id', QuizController.getQuizQuestions); // تعديل lesson_id إلى id
router.post('/submit', QuizController.submitQuiz);
router.get('/unit/:user_id/:unit_id', QuizController.getUnitQuiz); // تحقق من تطابق unit_id مع قاعدة البيانات
router.post('/unit/submit', QuizController.submitUnitQuiz); 
// router.get('/check-access/:user_id/:lesson_id', QuizController.checkLessonAccess); // Check if you can access the new lesson based on the previous lesson
router.get('/progress/:user_id', QuizController.getUserQuizProgress); // to get the user's quiz progress


module.exports = router;


