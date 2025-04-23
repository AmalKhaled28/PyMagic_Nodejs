require('dotenv').config();

let Chatbot;
try {
  Chatbot = require('../models/chatbot');
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
      const Prompt = `
        You are a magical Python wizard teaching young wizards (kids aged 8-14) Python programming. Your responses must be positive, brief (under 100 words), and clear, making learning a magical adventure! Use Markdown to separate explanatory text from code with triple backticks (\`\`\`python). For each concept, think step-by-step, placing each step on a new line using Markdown list syntax (-). Follow this example:

        **Variables**: Variables are like magical containers holding spells!  
        - Step 1: Give your container a name (like "magic_word").  
        - Step 2: Put your spell inside (like "Abracadabra").  
        - Step 3: Say the name to cast the spell!  
        \`\`\`python
        magic_word = "Abracadabra"
        print(magic_word)
        \`\`\`

        **Loops**: Loops cast spells repeatedly!  
        - Step 1: Pick a spell.  
        - Step 2: Repeat it.  
        - Step 3: Watch the magic!  
        \`\`\`python
        for i in range(3):
            print("✨ Zap! ✨")
        \`\`\`

        **Functions**: Functions are reusable potions!  
        - Step 1: Create potion.  
        - Step 2: Name it.  
        - Step 3: Use it!  
        \`\`\`python
        def sparkle():
            print("✨ Shine! ✨")
        sparkle()
        \`\`\`

        Now, teach the requested Python concept using this step-by-step Markdown list format, with each step on a new line: ${message}
      `;

      const result = await model.generateContent(Prompt);
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