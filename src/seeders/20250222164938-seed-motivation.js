const { Sequelize } = require('sequelize');
const { QueryInterface } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('motivations', [
      {
        id: 1,
        text: 'Fantastic work! You\'re mastering this!',
        score_level: 'exultant',
        created_at: new Date()
      },
      {
        id: 2,
        text: 'You are doing great! Keep up the momentum!',
        score_level: 'exultant',
        created_at: new Date()
      },
      {
        id: 3,
        text: 'Amazing progress! Keep pushing forward!',
        score_level: 'exultant',
        created_at: new Date()
      },
      {
        id: 4,
        text: 'Nice effort! You\'re getting better!',
        score_level: 'good',
        created_at: new Date()
      },
      {
        id: 5,
        text: 'Good job! Stay consistent and you\'ll improve!',
        score_level: 'good',
        created_at: new Date()
      },
      {
        id: 6,
        text: 'You\'re on the right track! Keep practicing!',
        score_level: 'good',
        created_at: new Date()
      },
      {
        id: 7,
        text: 'Don’t give up! Every mistake is a step toward success!',
        score_level: 'bad',
        created_at: new Date()
      },
      {
        id: 8,
        text: 'Keep trying! Learning takes time and effort!',
        score_level: 'bad',
        created_at: new Date()
      },
      {
        id: 9,
        text: 'Failure is just part of the journey. Keep going!',
        score_level: 'bad',
        created_at: new Date()
      },
      {
        id: 10,
        text: 'You are unstoppable! Keep reaching for your goals!',
        score_level: 'exultant',
        created_at: new Date()
      },
      {
        id: 11,
        text: 'Your dedication is inspiring! Keep up the great work!',
        score_level: 'exultant',
        created_at: new Date()
      },
      {
        id: 12,
        text: "You're improving every day! Stay focused!'",
        score_level: 'good',
        created_at: new Date()
      },
      {
        id: 13,
        text: 'Great effort! Keep building on your strengths!',
        score_level: 'good',
        created_at: new Date()
      },
      {
        id: 14,
        text: 'Mistakes help you grow! Keep going!',
        score_level: 'bad',
        created_at: new Date()
      },
      {
        id: 15,
        text: 'Every step forward is progress! Stay committed!',
        score_level: 'bad',
        created_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('motivations', null, {});
  }
};


