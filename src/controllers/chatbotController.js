const Chatbot = require('../models/chatbot');

exports.getAllResponses = async (req, res) => {
    try {
        const responses = await Chatbot.findAll();
        res.json(responses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
