const Achievement = require('../models/achievement');

exports.getAllAchievements = async (req, res) => {
    try {
        const achievements = await Achievement.findAll();
        res.json(achievements);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
