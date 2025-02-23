const StudentQuizQuestion = require('../models/studentquizquestions');

exports.getAllStudentQuizQuestions = async (req, res) => {
    try {
        const questions = await StudentQuizQuestion.findAll();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
