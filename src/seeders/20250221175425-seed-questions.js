'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Questions', [
      {
        lessonId: '1.1',
        questionText: 'What is Node.js?',
        questionType: 'multiple_choice',
        options: JSON.stringify(['A runtime', 'A framework', 'A language', 'None of these']),
        correctAnswer: 'A runtime',
        questionHint: 'Consider how Node executes JavaScript on the server side',
        level: 'easy',
        questionPoints: 5,
        createdAt: new Date(),
      },
      {
        lessonId: '2',
        questionText: 'Is JavaScript single-threaded?',
        questionType: 'true_false',
        options: JSON.stringify(['True', 'False']),
        correctAnswer: 'True',
        questionHint: 'Recall how the event loop functions',
        level: 'medium',
        questionPoints: 5,
        createdAt: new Date(),
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Questions', null, {})
  }
}
