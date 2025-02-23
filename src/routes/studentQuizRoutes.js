const express = require('express');
const router = express.Router();
const studentQuizController = require('../controllers/studentQuizController');

router.get('/', studentQuizController.getAllStudentQuizzes);
router.get('/:id', studentQuizController.getStudentQuizById);

module.exports = router;
