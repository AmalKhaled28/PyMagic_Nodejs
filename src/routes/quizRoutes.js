const express = require('express');
const QuizController = require('../controllers/quizController');

const authMiddleware = require('../middlewares/auth');

const router = express.Router();


router.use(authMiddleware);

router.get('/lesson/:id', QuizController.getQuizQuestions);
router.post('/submit', QuizController.submitQuiz);
router.get('/unit/:user_id/:unit_id', QuizController.getUnitQuiz);
router.post('/unit/submit', QuizController.submitUnitQuiz);
router.get('/progress/:user_id', QuizController.getUserQuizProgress);
router.get('/review/:quiz_id', QuizController.getQuizReviewDetails);

router.get('/check-access/lesson/:user_id/:lesson_id', QuizController.checkLessonAccess);

router.get('/check-access/unit/:user_id/:unit_id', QuizController.checkLessonAccess);

module.exports = router;


