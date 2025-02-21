'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('sections', [
      {
        id: 1,
        name: 'Programming Basics',
        description: 'Introduction to programming concepts',
        created_at: new Date()
      },
      {
        id: 2,
        name: 'Advanced Topics',
        description: 'In-depth advanced programming topics',
        created_at: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sections', null, {})
  }
}

// npx sequelize-cli seed:generate --name seed-questions
// npx sequelize-cli db:seed:undo:all
// npx sequelize-cli db:seed:all
