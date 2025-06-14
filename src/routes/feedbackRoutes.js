const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.post('/submit', feedbackController.submitFeedback);

router.get('/check/:quizId', feedbackController.checkFeedback);

module.exports = router;