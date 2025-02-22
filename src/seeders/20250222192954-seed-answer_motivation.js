const { Sequelize } = require('sequelize');
const { QueryInterface } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('answer_motivation', [
      {
        id: 1,
        text: 'Great job! You got it right!',
        answer_type: 'correct',
        created_at: new Date()
      },
      {
        id: 2,
        text: 'Excellent work! Keep going!',
        answer_type: 'correct',
        created_at: new Date()
      },
      {
        id: 3,
        text: 'Fantastic! You nailed it!',
        answer_type: 'correct',
        created_at: new Date()
      },
      {
        id: 4,
        text: 'Oops! That was incorrect, but keep trying!',
        answer_type: 'wrong',
        created_at: new Date()
      },
      {
        id: 5,
        text: 'Not quite, but don’t give up!',
        answer_type: 'wrong',
        created_at: new Date()
      },
      {
        id: 6,
        text: 'That wasn’t right, but you’re learning!',
        answer_type: 'wrong',
        created_at: new Date()
      },
      {
        id: 7,
        text: 'Well done! Keep up the great work!',
        answer_type: 'correct',
        created_at: new Date()
      },
      {
        id: 8,
        text: 'Superb! You’re improving every time!',
        answer_type: 'correct',
        created_at: new Date()
      },
      {
        id: 9,
        text: 'Almost there! Review and try again!',
        answer_type: 'wrong',
        created_at: new Date()
      },
      {
        id: 10,
        text: 'You’re doing great! Keep pushing forward!',
        answer_type: 'correct',
        created_at: new Date()
      },
      {
        id: 11,
        text: 'That’s okay! Learn from it and try again!',
        answer_type: 'wrong',
        created_at: new Date()
      },
      {
        id: 12,
        text: 'Nice try! Keep practicing and you’ll get it!',
        answer_type: 'wrong',
        created_at: new Date()
      },
      {
        id: 13,
        text: 'Amazing effort! You’re mastering this!',
        answer_type: 'correct',
        created_at: new Date()
      },
      {
        id: 14,
        text: 'Brilliant! Keep it up!',
        answer_type: 'correct',
        created_at: new Date()
      },
      {
        id: 15,
        text: 'You’re so close! Try again!',
        answer_type: 'wrong',
        created_at: new Date()
      },
      {
        id: 16,
        text: 'Every mistake is a step toward success!',
        answer_type: 'wrong',
        created_at: new Date()
      },
      {
        id: 17,
        text: 'Spot on! You’re getting better!',
        answer_type: 'correct',
        created_at: new Date()
      },
      {
        id: 18,
        text: 'Great progress! Keep challenging yourself!',
        answer_type: 'correct',
        created_at: new Date()
      },
      {
        id: 19,
        text: 'Don’t worry! Mistakes help you learn!',
        answer_type: 'wrong',
        created_at: new Date()
      },
      {
        id: 20,
        text: 'Keep at it! You’re on the right path!',
        answer_type: 'wrong',
        created_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('answer_motivation', null, {});
  }
};
