const Question = require('../models/question');

exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.findAll();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findByPk(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.json(question);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createQuestion = async (req, res) => {
    try {
        const question = await Question.create(req.body);
        res.status(201).json(question);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByPk(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });

        await question.update(req.body);
        res.json(question);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByPk(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });

        await question.destroy();
        res.json({ message: 'Question deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
