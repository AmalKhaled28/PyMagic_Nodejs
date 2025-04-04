'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First insert sections (without names/descriptions)
    await queryInterface.bulkInsert('sections', [
      {
        id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

    // Then insert translations for each section (English)
    await queryInterface.bulkInsert('section_translations', [
      {
        id: 1,
        section_id: 1,
        language: 'en',
        name: 'Programming Basics',
        description: 'Introduction to programming concepts',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        section_id: 2,
        language: 'en',
        name: 'Advanced Topics',
        description: 'In-depth advanced programming topics',
        created_at: new Date(),
        updated_at: new Date()
      },
      //  Arabic translations
      {
        id: 3,
        section_id: 1,
        language: 'ar',
        name: 'أساسيات البرمجة',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        section_id: 2,
        language: 'ar',
        name: 'مواضيع متقدمة',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // First delete translations (to maintain referential integrity)
    await queryInterface.bulkDelete('section_translations', null, {});
    // Then delete sections
    await queryInterface.bulkDelete('sections', null, {});
  }
};

// npx sequelize-cli seed:generate --name seed-questions
// npx sequelize-cli db:seed:undo:all
// npx sequelize-cli db:seed:all
