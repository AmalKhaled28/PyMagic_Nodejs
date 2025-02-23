const Motivation = require('../models/motivation');

exports.getAllMotivations = async (req, res) => {
    try {
        const motivations = await Motivation.findAll();
        res.json(motivations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMotivationById = async (req, res) => {
    try {
        const motivation = await Motivation.findByPk(req.params.id);
        if (!motivation) return res.status(404).json({ message: 'Motivation not found' });
        res.json(motivation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createMotivation = async (req, res) => {
    try {
        const motivation = await Motivation.create(req.body);
        res.status(201).json(motivation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateMotivation = async (req, res) => {
    try {
        const motivation = await Motivation.findByPk(req.params.id);
        if (!motivation) return res.status(404).json({ message: 'Motivation not found' });

        await motivation.update(req.body);
        res.json(motivation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteMotivation = async (req, res) => {
    try {
        const motivation = await Motivation.findByPk(req.params.id);
        if (!motivation) return res.status(404).json({ message: 'Motivation not found' });

        await motivation.destroy();
        res.json({ message: 'Motivation deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
