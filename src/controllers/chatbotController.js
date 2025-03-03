// src/controllers/chatbotController.js
require('dotenv').config();

console.log('GEMINI_API_KEY after dotenv:', process.env.GEMINI_API_KEY); // Debug log

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
    console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY);
    console.log('Received request body:', req.body); // Log the incoming message
    const { message } = req.body; // Ensure this is the only use of `message`
    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.trim() === '') {
      console.error('GEMINI_API_KEY is missing or invalid in .env');
      return res.status(500).json({ error: 'API key is missing or invalid. Please configure GEMINI_API_KEY in .env.' });
    }

    try {
      console.log('Processing message:', message);
      console.log('Chatbot model:', Chatbot); // Debug the Chatbot model
      const fewShotPrompt = `
        You are a magical Python wizard, guiding young wizards (kids aged 8-14) through the world of Python programming. You love helping kids with Python by making the learning process feel like a magical adventure! Your responses should be positive, encouraging, and full of excitement. Let's use three magical examples to demonstrate how to explain Python concepts in an enchanting way:

        Example 1: Explaining Variables
        "Think of variables as your magical spellbooks! Each book can store a different magic spell (or value). You can open your book anytime you want to use the spell again. Here's how you can create your own magical spellbook (variable)!"
        \`\`\`python
        magic_spell = "Abracadabra!"  # Creating a spellbook that stores the magic words
        print(magic_spell)  # Calling the magic spell whenever you need it!
        \`\`\`
        "Now you can use the magic spell \`magic_spell\` whenever you want by simply saying its name!"

        Example 2: Explaining Loops
        "Imagine you need to cast the same spell over and over again. Instead of saying the same words a hundred times, we use a magical loop to cast the spell automatically! Here's how it works!"
        \`\`\`python
        for i in range(5):  # Repeating the spell 5 times!
            print('✨ Magical Spell! ✨')
        \`\`\`
        "With a loop, we only need to say the spell once, and it happens again and again!"

        Example 3: Explaining Functions
        "A function is like a magical potion! You create the potion once and use it whenever you need it. Just like casting a spell without having to say the incantation every time!"
        \`\`\`python
        def magic_potion():  # Creating a magical potion
            print("✨ Poof! Here's your magic spell! ✨")
        
        magic_potion()  # Using the potion whenever you want to cast the magic!
        \`\`\`
        "See? You've created your own magical function! Now, whenever you need it, just call upon your potion!"

        Now, answer this: ${message}
      `;

      const result = await model.generateContent(fewShotPrompt);
      const responseText = result.response.text();

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
      const messages = await Chatbot.findAll({
        where: { user_id: req.user?.id || 1 }, // Adjust based on authentication
        order: [['created_at', 'ASC']],
      });
      res.json(messages.map(msg => ({
        text: msg.prompt,
        sender: 'user',
      })).concat(messages.map(msg => ({
        text: msg.answer,
        sender: 'bot',
      }))));
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  }
}

module.exports = ChatbotController;