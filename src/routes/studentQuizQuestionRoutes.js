const express = require('express');
const router = express.Router();
const studentQuizQuestionController = require('../controllers/studentQuizQuestionController');

router.get('/', studentQuizQuestionController.getAllStudentQuizQuestions);

module.exports = router;
