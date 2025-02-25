'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('units', [
      {
        id: 1,
        unit_id: '1.1',
        section_id: 1, // Must match an existing section from Sections
        name: 'Introduction to programming',
        description: 'Basics of programming',
        created_at: new Date()
      },
      {
        id: 2,
        unit_id: '1.2',
        section_id: 1, // Must match an existing section from Sections
        name: 'Getting Started with Python',
        description: 'Python programming language basics',
        created_at: new Date()
      },
      {
        id: 3,
        unit_id: '1.3',
        section_id: 1, // Must match an existing section from Sections
        name: 'Introducing Variables',
        description: 'Understanding variables in Python',
        created_at: new Date()
      },
      {
        id: 4,
        unit_id: '1.4',
        section_id: 1, // Must match an existing section from Sections
        name: 'Strings in Python',
        description: 'Working with strings in Python',
        created_at: new Date()
      },
      {
        id: 5,
        unit_id: '1.5',
        section_id: 1, // Must match an existing section from Sections
        name: 'Numbers in Python',
        description: 'Working with numbers and arithmetic operations',
        created_at: new Date()
      },
      {
        id: 6,
        unit_id: '1.6',
        section_id: 1, // Must match an existing section from Sections
        name: 'Decision making statements in Python',
        description: 'Using conditional statements in Python',
        created_at: new Date()
      },
      {
        id: 7,
        unit_id: '1.7',
        section_id: 1, // Must match an existing section from Sections
        name: 'Python Loops',
        description: 'Understanding loops in Python',
        created_at: new Date()
      },
      {
        id: 8,
        unit_id: '1.8',
        section_id: 1, // Must match an existing section from Sections
        name: 'Lists',
        description: 'Working with lists in Python',
        created_at: new Date()
      },
      {
        id: 9,
        unit_id: '1.9',
        section_id: 1, // Must match an existing section from Sections
        name: 'Functions',
        description: 'Understanding and creating functions in Python',
        created_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('units', null, {});
  }
};