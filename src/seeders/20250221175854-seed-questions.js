'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('questions', [
      {
        id: 1,
        lesson_id: '1.1.1',
        question: 'What is Node.js?',
        type: 'multiple_choice',
        options: JSON.stringify(['A runtime', 'A framework', 'A language', 'None of these']),
        correct_answer: 'A runtime',
        hint: 'Consider how Node executes JavaScript on the server side',
        level: 'easy',
        points: 5,
        created_at: new Date(),
      },
      {
        id:2,
        lesson_id: '1.2.1',
        question: 'Is JavaScript single-threaded?',
        type: 'true_false',
        options: JSON.stringify(['True', 'False']),
        correct_answer: 'True',
        hint: 'Recall how the event loop functions',
        level: 'medium',
        points: 5,
        created_at: new Date(),
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('questions', null, {})
  }
}
