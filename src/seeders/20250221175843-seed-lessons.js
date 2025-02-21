'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('lessons', [
      {
        id: '1.1.1',
        unit_id: '1.1', // Must match an existing unit from Units
        title: 'What is Programming?',
        description: 'An introduction to programming',
        flash_card: 'flash1.png',
        video_url: 'http://example.com/video1',
        created_at: new Date()
      },
      {
        id: '1.2.1',
        unit_id: '1.2', // Must match an existing unit from Units
        title: 'Advanced Concepts',
        description: 'Detailed advanced programming concepts',
        flash_card: 'flash2.png',
        video_url: 'http://example.com/video2',
        created_at: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('lessons', null, {})
  }
}
