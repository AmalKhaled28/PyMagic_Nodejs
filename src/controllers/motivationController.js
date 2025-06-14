const { Motivation, MotivationTranslation } = require('../models');
const { Sequelize } = require('sequelize');

// fetch a motivational message based on score percentage and language
const getMotivationalMessage = async (req, res) => {
  try {
    const { score, total } = req.query;

    if (!score || !total) {
      return res.status(400).json({
        success: false,
        message: 'Both score and total are required.',
      });
    }

    const userScore = parseFloat(score);
    const totalScore = parseFloat(total);

    if (isNaN(userScore) || isNaN(totalScore) || totalScore <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Score and total must be valid numbers, and total must be greater than 0.',
      });
    }

    // Calculate the percentage score
    const percentage = (userScore / totalScore) * 100;

    // Determine the score level based on the percentage
    let scoreLevel;
    if (percentage >= 80) {
      scoreLevel = 'exultant';
    } else if (percentage >= 50) {
      scoreLevel = 'good';
    } else {
      scoreLevel = 'bad';
    }

    // Fetch a random motivational message for the given score level
    const motivation = await Motivation.findOne({
      where: { score_level: scoreLevel },
      order: Sequelize.literal('RAND()'), 
    });

    if (!motivation) {
      return res.status(404).json({
        success: false,
        message: 'No motivational message found for this score level.',
      });
    }

    const language = req.headers["accept-language"] || "en";

    // Fetch the translation for the given language
    let translation = await MotivationTranslation.findOne({
      where: {
        motivation_id: motivation.id,
        language: language.split('-')[0], 
      },
    });

    if (!translation) {
      translation = await MotivationTranslation.findOne({
        where: {
          motivation_id: motivation.id,
          language: 'en',
        },
      });
    }

    if (!translation) {
      return res.status(404).json({
        success: false,
        message: `No translation found for language: ${language} or fallback language.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: translation.text,
    });
  } catch (error) {
    console.error('Error fetching motivational message:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};

module.exports = { getMotivationalMessage };