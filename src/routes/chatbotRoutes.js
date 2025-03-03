// routes/chatbot.js
const express = require('express');
const router = express.Router();
const ChatbotController = require('../controllers/chatbotController');

router.get('/messages', ChatbotController.getMessages);
router.post('/send', ChatbotController.sendMessage);

module.exports = router;