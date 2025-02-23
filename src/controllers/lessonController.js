const Lesson = require('../models/lesson');

exports.getAllLessons = async (req, res) => {
    try {
        const lessons = await Lesson.findAll();
        res.json(lessons);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findByPk(req.params.id);
        if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
        res.json(lesson);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createLesson = async (req, res) => {
    try {
        const lesson = await Lesson.create(req.body);
        res.status(201).json(lesson);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByPk(req.params.id);
        if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

        await lesson.update(req.body);
        res.json(lesson);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByPk(req.params.id);
        if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

        await lesson.destroy();
        res.json({ message: 'Lesson deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
