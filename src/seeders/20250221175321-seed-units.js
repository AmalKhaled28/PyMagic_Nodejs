
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First insert units (without names/descriptions)
    await queryInterface.bulkInsert('units', [
      { id: 1, section_id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 2, section_id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 3, section_id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 4, section_id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 5, section_id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 6, section_id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 7, section_id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 8, section_id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 9, section_id: 1, created_at: new Date(), updated_at: new Date() }
    ], {});

    // Then insert translations for each unit (English and Arabic)
    await queryInterface.bulkInsert('unit_translations', [
      // English translations
      { id: 1, unit_id: 1, language: 'en', name: 'Introduction to programming', created_at: new Date(), updated_at: new Date() },
      { id: 2, unit_id: 2, language: 'en', name: 'Getting Started with Python', created_at: new Date(), updated_at: new Date() },
      { id: 3, unit_id: 3, language: 'en', name: 'Introducing Variables', created_at: new Date(), updated_at: new Date() },
      { id: 4, unit_id: 4, language: 'en', name: 'Strings in Python', created_at: new Date(), updated_at: new Date() },
      { id: 5, unit_id: 5, language: 'en', name: 'Numbers in Python', created_at: new Date(), updated_at: new Date() },
      { id: 6, unit_id: 6, language: 'en', name: 'Decision making statements in Python', created_at: new Date(), updated_at: new Date() },
      { id: 7, unit_id: 7, language: 'en', name: 'Python Loops', created_at: new Date(), updated_at: new Date() },
      { id: 8, unit_id: 8, language: 'en', name: 'Lists', created_at: new Date(), updated_at: new Date() },
      { id: 9, unit_id: 9, language: 'en', name: 'Functions', created_at: new Date(), updated_at: new Date() },
      
      // Arabic translations (الترجمات العربية)
      { id: 10, unit_id: 1, language: 'ar', name: 'مقدمة في البرمجة', created_at: new Date(), updated_at: new Date() },
      { id: 11, unit_id: 2, language: 'ar', name: 'البدء مع بايثون', created_at: new Date(), updated_at: new Date() },
      { id: 12, unit_id: 3, language: 'ar', name: 'مقدمة في المتغيرات', created_at: new Date(), updated_at: new Date() },
      { id: 13, unit_id: 4, language: 'ar', name: 'النصوص في بايثون', created_at: new Date(), updated_at: new Date() },
      { id: 14, unit_id: 5, language: 'ar', name: 'الأرقام في بايثون', created_at: new Date(), updated_at: new Date() },
      { id: 15, unit_id: 6, language: 'ar', name: 'عبارات اتخاذ القرار في بايثون', created_at: new Date(), updated_at: new Date() },
      { id: 16, unit_id: 7, language: 'ar', name: 'الحلقات في بايثون', created_at: new Date(), updated_at: new Date() },
      { id: 17, unit_id: 8, language: 'ar', name: 'القوائم', created_at: new Date(), updated_at: new Date() },
      { id: 18, unit_id: 9, language: 'ar', name: 'الدوال', created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // First delete translations (to maintain referential integrity)
    await queryInterface.bulkDelete('unit_translations', null, {});
    // Then delete units
    await queryInterface.bulkDelete('units', null, {});
  }
};