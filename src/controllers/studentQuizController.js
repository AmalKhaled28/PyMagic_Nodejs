const StudentQuiz = require('../models/studentQuiz');

exports.getAllStudentQuizzes = async (req, res) => {
    try {
        const quizzes = await StudentQuiz.findAll();
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getStudentQuizById = async (req, res) => {
    try {
        const quiz = await StudentQuiz.findByPk(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Student Quiz not found' });
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
