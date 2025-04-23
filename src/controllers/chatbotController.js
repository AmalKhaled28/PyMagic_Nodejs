// src/controllers/chatbotController.js
require('dotenv').config();

let Chatbot; // Declare Chatbot outside the class to avoid circular dependency issues
try {
  Chatbot = require('../models/chatbot'); // Dynamically load the model
} catch (error) {
  console.error('Error loading Chatbot model:', error);
}

const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });

class ChatbotController {
  static async sendMessage(req, res) {
    const { message } = req.body;
    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === '') {
      console.error('GEMINI_API_KEY is missing or invalid in .env');
      return res.status(500).json({ error: 'API key is missing or invalid. Please configure GEMINI_API_KEY in .env.' });
    }

    try {
      const fewShotPrompt = `
        You are a magical Python wizard, guiding young wizards (kids aged 8-14) through the world of Python programming. Your responses must be positive, brief, and clear, making learning feel like a magical adventure! Always separate explanatory text from Python code using Markdown. Use triple backticks 
        ```
        `python) for code blocks and keep text outside these blocks. Responses should be short (under 100 words) and exciting. For example:```
          ```
        **Variables**: Think of variables as magical spellbooks storing spells!
        \`\`\`python
        magic_spell = "Abracadabra!"
        print(magic_spell)
        \`\`\`

        **Loops**: Loops repeat spells automatically!
        \`\`\`python
        for i in range(5):
            print("✨ Magic! ✨")
        \`\`\`

        **Functions**: Functions are like reusable potions!
        \`\`\`python
        def magic_potion():
            print("✨ Poof! ✨")
        magic_potion()
        \`\`\`

        Now, answer this briefly for kids, using Markdown to separate text and code: ${message}
      `;

      const result = await model.generateContent(fewShotPrompt);
      let responseText = result.response.text();

      // Optional: Ensure code blocks are properly formatted
      if (!responseText.includes('```python')) {
        console.warn('Response lacks proper code block formatting. Adding default format.');
        responseText = `Here's the answer:\n\n${responseText}\n\n\`\`\`python\n# Example code (if needed)\n\`\`\``;
      }

      console.log('Generated response:', responseText);
      if (!Chatbot || typeof Chatbot.create !== 'function') {
        console.error('Chatbot model is not properly defined or loaded');
        return res.status(500).json({ error: 'Database model not available' });
      }

      await Chatbot.create({
        user_id: req.user?.id || 1,
        prompt: message,
        answer: responseText,
      });

      res.json({ reply: responseText });
    } catch (error) {
      console.error('Error generating response or saving to database:', error);
      res.status(500).json({ error: 'Failed to generate response or save to database' });
    }
  }

  static async getMessages(req, res) {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const messages = await Chatbot.findAll({
        where: { user_id: req.user.id },
        order: [['created_at', 'ASC']],
      });

      let messageList = [];

      messages.forEach((msg) => {
        messageList.push({
          text: msg.prompt,
          sender: 'user',
          timestamp: msg.created_at,
        });
        messageList.push({
          text: msg.answer,
          sender: 'bot',
          timestamp: msg.created_at,
        });
      });

      res.json(messageList);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  }
}

module.exports = ChatbotController;