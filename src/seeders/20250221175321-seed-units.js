"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "units",
      [
        {
          id: 1,
          section_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          section_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          section_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          section_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          section_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          section_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7,
          section_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 8,
          section_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9,
          section_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "unit_translations",
      [
        {
          id: 1,
          unit_id: 1,
          language: "en",
          name: "Introduction to programming",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          unit_id: 2,
          language: "en",
          name: "Getting Started with Python",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          unit_id: 3,
          language: "en",
          name: "Introducing Variables",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          unit_id: 4,
          language: "en",
          name: "Strings in Python",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          unit_id: 5,
          language: "en",
          name: "Numbers in Python",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          unit_id: 6,
          language: "en",
          name: "Decision making statements in Python",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7,
          unit_id: 7,
          language: "en",
          name: "Python Loops",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 8,
          unit_id: 8,
          language: "en",
          name: "Lists",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9,
          unit_id: 9,
          language: "en",
          name: "Functions",
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          id: 10,
          unit_id: 1,
          language: "ar",
          name: "مقدمة في البرمجة",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 11,
          unit_id: 2,
          language: "ar",
          name: "البدء مع بايثون",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 12,
          unit_id: 3,
          language: "ar",
          name: "مقدمة في variables",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 13,
          unit_id: 4,
          language: "ar",
          name: "Strings في بايثون",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 14,
          unit_id: 5,
          language: "ar",
          name: "Numbers في بايثون",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 15,
          unit_id: 6,
          language: "ar",
          name: "Decision making statements في بايثون",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 16,
          unit_id: 7,
          language: "ar",
          name: "Loops في بايثون",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 17,
          unit_id: 8,
          language: "ar",
          name: "Lists في بايثون",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 18,
          unit_id: 9,
          language: "ar",
          name: "Functions في بايثون",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("unit_translations", null, {});
    await queryInterface.bulkDelete("units", null, {});
  },
};
