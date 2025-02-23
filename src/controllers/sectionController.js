const Section = require("../models/section");

exports.getSections = async (req, res) => {
    try {
        const sections = await Section.findAll();
        res.json(sections);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createSection = async (req, res) => {
    try {
        const section = await Section.create(req.body);
        res.status(201).json(section);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};