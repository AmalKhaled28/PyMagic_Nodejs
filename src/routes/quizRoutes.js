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
router.get('/check-access/:user_id/:lesson_id', QuizController.checkLessonAccess); // تحقق من إمكانية الدخول للدرس الجديد


module.exports = router;


