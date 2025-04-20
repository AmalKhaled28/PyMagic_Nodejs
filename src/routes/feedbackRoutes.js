// routes/feedbackRoutes.js


const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const authMiddleware = require('../middlewares/auth');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Route to submit feedback
router.post('/submit', feedbackController.submitFeedback);

// Route to check if feedback exists for a quiz
router.get('/check/:quizId', feedbackController.checkFeedback);

module.exports = router;