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

// Updated route to handle both lesson and unit quiz access
router.get('/check-access/:user_id/:lesson_id?', QuizController.checkLessonAccess); // lesson_id is optional
router.get('/check-access/:user_id/unit/:unit_id', QuizController.checkLessonAccess); // Separate route for unit quiz

module.exports = router;


