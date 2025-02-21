'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('units', [
      {
        id: '1.1',
        section_id: 1, // Must match an existing section from Sections
        name: 'Introduction',
        description: 'Basics of programming',
        created_at: new Date()
      },
      {
        id: '1.2',
        section_id: 2, // Must match an existing section from Sections
        name: 'Deep Dive',
        description: 'Advanced programming techniques',
        created_at: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('units', null, {})
  }
}
