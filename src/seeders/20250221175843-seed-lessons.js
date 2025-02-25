'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('lessons', [
      {
        id: 1,
        lesson_id: '1.1.1',
        unit_id: 1,
        title: 'What is Programming?',
        description: 'An introduction to programming',
        flash_card: 'Programming is like asking a computer to do something for you, just like asking your mom for a sandwich. Instead of words, we use special languages to tell computers what to do!',
        video_url: '/videos/lesson1_what_is_programming.mp4',
        language: 'English',
        created_at: new Date()
      },
      {
        id: 2,
        lesson_id: '1.2.1',
        unit_id: 2,
        title: 'Python Introduction',
        description: 'An introduction to Python programming language',
        flash_card: 'Python is a simple programming language that helps us give instructions to a computer. You can use it to solve math problems, draw pictures, or even make games!',
        video_url: '/videos/lesson_python_intro.mp4',
        language: 'English',
        created_at: new Date()
      },
      {
        id: 3,
        lesson_id: '1.2.2',
        unit_id: 2,
        title: 'Python Print',
        description: 'Using the print function in Python',
        flash_card: 'The print function tells the computer to show something on the screen, like words, numbers, or math results. It\'s great for checking what your code does!',
        video_url: '/videos/lesson_python_print.mp4',
        language: 'English',
        created_at: new Date()
      },
      {
        id: 4,
        lesson_id: '1.2.3',
        unit_id: 2,
        title: 'Python Comments',
        description: 'Using comments in Python',
        flash_card: 'Comments are notes in your code to explain what it does. The computer ignores them. Single-line comment: Starts with #. Multi-line comment: Uses triple quotes """ or \'.',
        video_url: '/videos/lesson_python_comments.mp4',
        language: 'English',
        created_at: new Date()
      },
      {
        id: 5,
        lesson_id: '1.2.4',
        unit_id: 2,
        title: 'Python Data Types',
        description: 'Understanding data types in Python',
        flash_card: 'Python uses data types to organize and communicate information: Numbers: Integers (x = 5), Floats (x = 3.5), Strings (x = "Hello!"), Booleans (x = True or False).',
        video_url: '/videos/lesson_python_data_types.mp4',
        language: 'English',
        created_at: new Date()
      },
      {
        id: 6,
        lesson_id: '1.3.1',
        unit_id: 3,
        title: 'What are Variables?',
        description: 'Introduction to variables in programming',
        flash_card: 'Variables are like boxes where we store information to use later. Create a variable: Use = to store information (phone = 0123456789). Use a variable: Write the variable\'s name to access its value (print(phone)).',
        video_url: '/videos/lesson_python_variables.mp4',
        language: 'English',
        created_at: new Date()
      },
      {
        id: 7,
        lesson_id: '1.3.2',
        unit_id: 3,
        title: 'Naming Variables',
        description: 'Rules for naming variables in programming',
        flash_card: 'Use meaningful names (e.g., name, phone). Start with a letter (e.g., phone_number, not 1st_phone). Numbers can come after the first letter (e.g., user1). No spaces (e.g., student_name, not student name). Use lowercase and separate words with underscores (e.g., first_name).',
        video_url: '/videos/lesson_python_variable_naming.mp4',
        language: 'English',
        created_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('lessons', null, {});
  }
};
