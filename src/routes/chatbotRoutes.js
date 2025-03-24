// routes/chatbot.js
const express = require('express');
const router = express.Router();
const ChatbotController = require('../controllers/chatbotController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);


router.post('/messages', ChatbotController.getMessages);
router.post('/send', ChatbotController.sendMessage);

module.exports = router;