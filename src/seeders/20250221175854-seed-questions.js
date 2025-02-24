'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('questions', [
      // ========================================================
      // section 1, unit 1, lesson 1 {1.1.1} - Programming Basics
      // ==========================================================
      {
        id: 1,
        lesson_id: 1, // Updated to integer
        question: 'What do computers understand?',
        type: 'multiple_choice',
        options: JSON.stringify(['English and Arabic', 'Colors and shapes', '0s and 1s', 'Funny sounds']),
        correct_answer: '0s and 1s',
        hint: 'Computers only understand on/off switches! 💡',
        level: 'easy',
        points: 5,
        created_at: new Date(),
      },
      {
        id: 2,
        lesson_id: 1, // Updated to integer
        question: 'What is easier than writing 0s and 1s?',
        type: 'multiple_choice',
        options: JSON.stringify(['Drawing pictures', 'Using programming languages', 'Counting stars', 'Writing a book']),
        correct_answer: 'Using programming languages',
        hint: 'Special computer words! ✨',
        level: 'medium',
        points: 7,
        created_at: new Date(),
      },
      {
        id: 3,
        lesson_id: 1, // Updated to integer
        question: 'What does "programming" help us do?',
        type: 'multiple_choice',
        options: JSON.stringify(['Teach a computer how to cook', 'Tell a computer exactly what to do', 'Make friends with a computer', 'Turn a computer into a toy']),
        correct_answer: 'Tell a computer exactly what to do',
        hint: 'Like teaching a robot! 🤖',
        level: 'easy',
        points: 5,
        created_at: new Date(),
      },
      {
        id: 4,
        lesson_id: 1, // Updated to integer
        question: 'What do we call giving instructions to a computer?',
        type: 'multiple_choice',
        options: JSON.stringify(['Programming', 'Painting', 'Storytelling', 'Singing']),
        correct_answer: 'Programming',
        hint: 'Writing computer recipes! 📝',
        level: 'easy',
        points: 5,
        created_at: new Date(),
      },
      {
        id: 5,
        lesson_id: 1, // Updated to integer
        question: 'What kind of information do computers truly understand?',
        type: 'multiple_choice',
        options: JSON.stringify(['Spoken languages', 'Colors and shapes', '0s and 1s', 'Silly noises']),
        correct_answer: '0s and 1s',
        hint: 'Just two numbers! 0️⃣1️⃣',
        level: 'medium',
        points: 7,
        created_at: new Date(),
      },
      {
        id: 6,
        lesson_id: 1, // Updated to integer
        question: 'What makes it simpler to communicate with computers?',
        type: 'multiple_choice',
        options: JSON.stringify(['Drawings', 'Programming languages', 'Counting stars', 'Writing stories']),
        correct_answer: 'Programming languages',
        hint: 'Special computer translator! 🌐',
        level: 'medium',
        points: 7,
        created_at: new Date(),
      },
      {
        id: 7,
        lesson_id: 1, // Updated to integer
        question: 'What is the main purpose of programming?',
        type: 'multiple_choice',
        options: JSON.stringify(['Bake cookies', 'Give step-by-step instructions', 'Make friends', 'Create toys']),
        correct_answer: 'Give step-by-step instructions',
        hint: 'Like a treasure map! 🗺️',
        level: 'hard',
        points: 10,
        created_at: new Date(),
      },
      {
        id: 8,
        lesson_id: 1, // Updated to integer
        question: 'What’s writing computer instructions called?',
        type: 'multiple_choice',
        options: JSON.stringify(['Programming', 'Drawing', 'Storytelling', 'Singing']),
        correct_answer: 'Programming',
        hint: 'Building with code blocks! 🧱',
        level: 'easy',
        points: 5,
        created_at: new Date(),
      },
      {
        id: 9,
        lesson_id: 1, // Updated to integer
        question: 'Why use programming languages?',
        type: 'multiple_choice',
        options: JSON.stringify(['Talk to computers', 'Make music', 'Learn human languages', 'Decorate computers']),
        correct_answer: 'Talk to computers',
        hint: 'Computer translator! 🗣️💻',
        level: 'hard',
        points: 10,
        created_at: new Date(),
      },
      {
        id: 10,
        lesson_id: 1, // Updated to integer
        question: 'What happens when we write a program?',
        type: 'multiple_choice',
        options: JSON.stringify(['Computer thinks', 'Computer follows instructions', 'Computer talks', 'Computer gets smart']),
        correct_answer: 'Computer follows instructions',
        hint: 'Good listener! 👂',
        level: 'medium',
        points: 7,
        created_at: new Date(),
      },
      {
        id: 11,
        lesson_id: 1, // Updated to integer
        question: 'How does programming help us?',
        type: 'multiple_choice',
        options: JSON.stringify(['Chat faster', 'Do tasks quickly', 'Teach eating', 'Watch TV']),
        correct_answer: 'Do tasks quickly',
        hint: 'Super fast helper! ⚡',
        level: 'hard',
        points: 10,
        created_at: new Date(),
      },
      {
        id: 12,
        lesson_id: 1, // Updated to integer
        question: 'Programming is like asking a robot for help.',
        type: 'true_false',
        options: JSON.stringify(['True', 'False']),
        correct_answer: 'True',
        hint: 'Robot helper! 🤖',
        level: 'easy',
        points: 5,
        created_at: new Date(),
      },
      {
        id: 13,
        lesson_id: 1, // Updated to integer
        question: 'Computers understand English/Arabic.',
        type: 'true_false',
        options: JSON.stringify(['True', 'False']),
        correct_answer: 'False',
        hint: 'Need secret code! 🔐',
        level: 'medium',
        points: 7,
        created_at: new Date(),
      },
      {
        id: 14,
        lesson_id: 1, // Updated to integer
        question: 'Computers only understand 0s/1s.',
        type: 'true_false',
        options: JSON.stringify(['True', 'False']),
        correct_answer: 'True',
        hint: 'Only two numbers! 0️⃣1️⃣',
        level: 'easy',
        points: 5,
        created_at: new Date(),
      },
      {
        id: 15,
        lesson_id: 1, // Updated to integer
        question: 'Programming languages translate for computers.',
        type: 'true_false',
        options: JSON.stringify(['True', 'False']),
        correct_answer: 'True',
        hint: 'Like a dictionary! 📖',
        level: 'medium',
        points: 7,
        created_at: new Date(),
      },
      {
        id: 16,
        lesson_id: 1, // Updated to integer
        question: 'Writing 0s/1s is easy for humans.',
        type: 'true_false',
        options: JSON.stringify(['True', 'False']),
        correct_answer: 'False',
        hint: 'Too complicated! 😵',
        level: 'easy',
        points: 5,
        created_at: new Date(),
      },
      {
        id: 17,
        lesson_id: 1, // Updated to integer
        question: 'Computers understand instructions without translation.',
        type: 'true_false',
        options: JSON.stringify(['True', 'False']),
        correct_answer: 'False',
        hint: 'Need translation! 🔄',
        level: 'hard',
        points: 10,
        created_at: new Date(),
      },

      // ========================
      // section 1, unit 2, lesson 1 {1.2.1} - Python Introduction
      // ========================
      {
        id: 18,
        lesson_id: 2, // Updated to integer
        question: 'What is Python?',
        type: 'multiple_choice',
        options: JSON.stringify(['Snake', 'Programming tool', 'Game', 'Robot']),
        correct_answer: 'Programming tool',
        hint: 'Coding language! 🐍',
        level: 'easy',
        points: 5,
        created_at: new Date(),
      },
      {
        id: 19,
        lesson_id: 2, // Updated to integer
        question: 'What can you do with Python?',
        type: 'multiple_choice',
        options: JSON.stringify(['Math, art, games', 'Bake', 'Ride bike', 'Play soccer']),
        correct_answer: 'Math, art, games',
        hint: 'Create cool stuff! 🎨',
        level: 'medium',
        points: 7,
        created_at: new Date(),
      },
      {
        id: 20,
        lesson_id: 2, // Updated to integer
        question: 'Best thing about Python?',
        type: 'multiple_choice',
        options: JSON.stringify(['Hard to learn', 'Needs lots of code', 'Does much with little code', 'Makes sleep']),
        correct_answer: 'Does much with little code',
        hint: 'Small code, big power! 💪',
        level: 'hard',
        points: 10,
        created_at: new Date(),
      },
      {
        id: 21,
        lesson_id: 2, // Updated to integer
        question: 'What can Python help do?',
        type: 'multiple_choice',
        options: JSON.stringify(['Math', 'Say hello', 'Make games', 'All']),
        correct_answer: 'All',
        hint: 'Super tool! 🦸',
        level: 'medium',
        points: 7,
        created_at: new Date(),
      },
      {
        id: 22,
        lesson_id: 2, // Updated to integer
        question: 'Who can learn Python?',
        type: 'multiple_choice',
        options: JSON.stringify(['Scientists only', 'Everyone', 'Adults only', 'Robots']),
        correct_answer: 'Everyone',
        hint: 'Kids can too! 👧👦',
        level: 'easy',
        points: 5,
        created_at: new Date(),
      },
      {
        id: 23,
        lesson_id: 2, // Updated to integer
        question: 'How to make computer say your name?',
        type: 'multiple_choice',
        options: JSON.stringify(['Python', 'Phone', 'Calculator', 'Dictionary']),
        correct_answer: 'Python',
        hint: 'Code can talk! 🗣️',
        level: 'medium',
        points: 7,
        created_at: new Date(),
      },
      {
        id: 24,
        lesson_id: 2, // Updated to integer
        question: 'What happens with Python code?',
        type: 'multiple_choice',
        options: JSON.stringify(['Computer listens', 'Turns off', 'Ignores', 'Sings']),
        correct_answer: 'Computer listens',
        hint: 'Good listener! 👂',
        level: 'easy',
        points: 5,
        created_at: new Date(),
      },
      {
        id: 25,
        lesson_id: 2, // Updated to integer
        question: 'What is Python used for?',
        type: 'multiple_choice',
        options: JSON.stringify(['Math only', 'Games only', 'Many things', 'Scientists only']),
        correct_answer: 'Many things',
        hint: 'Super versatile! 🚀',
        level: 'hard',
        points: 10,
        created_at: new Date(),
      },
      {
        id: 26,
        lesson_id: 2, // Updated to integer
        question: 'How hard is Python?',
        type: 'multiple_choice',
        options: JSON.stringify(['Easy', 'Impossible', '10 years', 'Adults only']),
        correct_answer: 'Easy',
        hint: 'Like ABCs! 🔤',
        level: 'easy',
        points: 5,
        created_at: new Date(),
      },
      {
        id: 27,
        lesson_id: 2, // Updated to integer
        question: 'Why is Python fun?',
        type: 'multiple_choice',
        options: JSON.stringify(['Hard', 'Makes cool stuff', 'Only pictures', 'Snake name']),
        correct_answer: 'Makes cool stuff',
        hint: 'Create magic! ✨',
        level: 'medium',
        points: 7,
        created_at: new Date(),
      },
      {
        id: 28,
        lesson_id: 2, // Updated to integer
        question: 'Python is for...',
        type: 'multiple_choice',
        options: JSON.stringify(['Everyone', 'Scientists', 'Game', 'Numbers only']),
        correct_answer: 'Everyone',
        hint: 'All can learn! 👪',
        level: 'hard',
        points: 10,
        created_at: new Date(),
      },

      // ==================================================
      // section 1, unit 2, lesson 2 {1.2.2} - Python Print
      // ===================================================
      {
        id: 29,
        lesson_id: 3, // Updated to integer
        question: 'What does print() do?',
        type: 'multiple_choice',
        options: JSON.stringify(['Shows on screen', 'Prints paper', 'Dances', 'Turns off']),
        correct_answer: 'Shows on screen',
        hint: 'Screen display! 🖥️',
        level: 'easy',
        points: 5,
        created_at: new Date(),
      },
      {
        id: 30,
        lesson_id: 3, // Updated to integer
        question: 'How to show a word?',
        type: 'multiple_choice',
        options: JSON.stringify(['print("Hello")', 'print(Hello)', 'show[Hello]', 'word(Hello)']),
        correct_answer: 'print("Hello")',
        hint: 'Use quotes! ✏️',
        level: 'medium',
        points: 7,
        created_at: new Date(),
      },
      {
        id: 31,
        lesson_id: 3, // Updated to integer
        question: 'How to show a number?',
        type: 'multiple_choice',
        options: JSON.stringify(['print(5)', 'print("5")', 'number(5)', 'show[5]']),
        correct_answer: 'print(5)',
        hint: 'No quotes needed! 🔢',
        level: 'medium',
        points: 7,
        created_at: new Date(),
      },
      {
        id: 32,
        lesson_id: 3, // Updated to integer
        question: 'How to show 2+2 result?',
        type: 'multiple_choice',
        options: JSON.stringify(['print(2+2)', 'math(2+2)', 'print(2,2)', 'result[2+2]']),
        correct_answer: 'print(2+2)',
        hint: 'Let computer calculate! ➕',
        level: 'hard',
        points: 10,
        created_at: new Date(),
      },
      {
        id: 33,
        lesson_id: 3, // Updated to integer
        question: 'What does print("Fun!") show?',
        type: 'multiple_choice',
        options: JSON.stringify(['Fun!', 'Hard!', 'Nothing', 'Error']),
        correct_answer: 'Fun!',
        hint: 'Exact copy! 👯',
        level: 'easy',
        points: 5,
        created_at: new Date(),
      },
      {
        id: 34,
        lesson_id: 3, // Updated to integer
        question: 'Why use quotes?',
        type: 'multiple_choice',
        options: JSON.stringify(['Show text', 'Count letters', 'Confuse', 'Longer code']),
        correct_answer: 'Show text',
        hint: 'Words need quotes! 📝',
        level: 'medium',
        points: 7,
        created_at: new Date(),
      },
      {
        id: 35,
        lesson_id: 3, // Updated to integer
        question: 'What if no print()?',
        type: 'multiple_choice',
        options: JSON.stringify(['No display', 'Still shows', 'Draws', 'Stops']),
        correct_answer: 'No display',
        hint: 'Need print to see! 👀',
        level: 'easy',
        points: 5,
        created_at: new Date(),
      },
      {
        id: 36,
        lesson_id: 3, // Updated to integer
        question: 'Correct way to print "Hello"?',
        type: 'multiple_choice',
        options: JSON.stringify(['print("Hello")', 'print(Hello)', 'print[Hello]', 'print/Hello/']),
        correct_answer: 'print("Hello")',
        hint: 'Quotes matter! 🔑',
        level: 'medium',
        points: 7,
        created_at: new Date(),
      },
      {
        id: 37,
        lesson_id: 3, // Updated to integer
        question: 'Print helps...',
        type: 'multiple_choice',
        options: JSON.stringify(['Make website', 'Show results', 'Run computer', 'Draw']),
        correct_answer: 'Show results',
        hint: 'See your work! 👁️',
        level: 'easy',
        points: 5,
        created_at: new Date(),
      },
      {
        id: 38,
        lesson_id: 3, // Updated to integer
        question: 'How to print 8-2?',
        type: 'multiple_choice',
        options: JSON.stringify(['print(8-2)', 'print[8-2]', 'print(8,2)', 'print("8-2")']),
        correct_answer: 'print(8-2)',
        hint: 'Math first! ➖',
        level: 'hard',
        points: 10,
        created_at: new Date(),
      },
      {
        id: 39,
        lesson_id: 3, // Updated to integer
        question: 'What does print("Hello World") show?',
        type: 'multiple_choice',
        options: JSON.stringify(['Hello World', 'Hello', 'World', '"Hello World"']),
        correct_answer: 'Hello World',
        hint: 'No quotes in result! 🎩',
        level: 'easy',
        points: 5,
        created_at: new Date(),
      },
      {
        id: 40,
        lesson_id: 3, // Updated to integer
        question: 'How to print number 10?',
        type: 'multiple_choice',
        options: JSON.stringify(['print(10)', 'print("10")', 'number(10)', 'show(10)']),
        correct_answer: 'print(10)',
        hint: 'Numbers are easy! 😊',
        level: 'medium',
        points: 7,
        created_at: new Date(),
      },
      {
        id: 41,
        lesson_id: 3, // Updated to integer
        question: 'Print shows on screen.',
        type: 'true_false',
        options: JSON.stringify(['True', 'False']),
        correct_answer: 'True',
        hint: 'Screen time! 📺',
        level: 'easy',
        points: 5,
        created_at: new Date(),
      },
      {
        id: 42,
        lesson_id: 3, // Updated to integer
        question: 'Print only for words.',
        type: 'true_false',
        options: JSON.stringify(['True', 'False']),
        correct_answer: 'False',
        hint: 'Numbers work too! 🔢',
        level: 'medium',
        points: 7,
        created_at: new Date(),
      },
      {
        id: 43,
        lesson_id: 3, // Updated to integer
        question: 'Print can show math results.',
        type: 'true_false',
        options: JSON.stringify(['True', 'False']),
        correct_answer: 'True',
        hint: 'Math + print = friends! 🧮❤️',
        level: 'easy',
        points: 5,
        created_at: new Date(),
      },
      {
        id: 44,
        lesson_id: 3, // Updated to integer
        question: 'Print helps understand code.',
        type: 'true_false',
        options: JSON.stringify(['True', 'False']),
        correct_answer: 'True',
        hint: 'See what happens! 👀',
        level: 'medium',
        points: 7,
        created_at: new Date(),
      },
      {
        id: 45,
        lesson_id: 3, // Updated to integer
        question: 'Cannot use print to check code.',
        type: 'true_false',
        options: JSON.stringify(['True', 'False']),
        correct_answer: 'False',
        hint: 'Great for checking! ✔️',
        level: 'easy',
        points: 5,
        created_at: new Date(),
      },
      {
        id: 46,
        lesson_id: 3, // Updated to integer
        question: 'Print is unimportant.',
        type: 'true_false',
        options: JSON.stringify(['True', 'False']),
        correct_answer: 'False',
        hint: 'Very useful tool! 🛠️',
        level: 'easy',
        points: 5,
        created_at: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('questions', null, {});
  }
};