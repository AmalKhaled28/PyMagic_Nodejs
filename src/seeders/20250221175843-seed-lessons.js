'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('lessons', [
      {
        id: 1,
        unit_id: 1,
        title: 'What is Programming?',
        description: 'An introduction to programming',
        flash_card: 'Programming is like asking a computer to do something for you, just like asking your mom for a sandwich. Instead of words, we use special languages to tell computers what to do!',
        video_url: '/videos/lesson_python_intro.mp4',
        language: 'English',
        created_at: new Date()
      },
      {
        id: 2,
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
        unit_id: 3,
        title: 'Naming Variables',
        description: 'Rules for naming variables in programming',
        flash_card: 'Use meaningful names (e.g., name, phone). Start with a letter (e.g., phone_number, not 1st_phone). Numbers can come after the first letter (e.g., user1). No spaces (e.g., student_name, not student name). Use lowercase and separate words with underscores (e.g., first_name).',
        video_url: '/videos/lesson_python_variable_naming.mp4',
        language: 'English',
        created_at: new Date()
      },
      {
        id: 8,
        unit_id: 4,
        title: 'String Operators (+, *)',
        description: 'Introduction to string operators in Python',
        flash_card: 'String operators allow you to manipulate strings. The + operator concatenates strings, while the * operator repeats a string a specified number of times.',
        video_url: '/videos/lesson_python_string_operators.mp4',
        language: 'English',
        created_at: new Date()
      },
      {
        id: 9,
        unit_id: 5,
        title: 'Basic Arithmetic in Python (+, -, *, /)',
        description: 'Introduction to basic arithmetic operations in Python',
        flash_card: 'Python supports basic arithmetic operations: addition (+), subtraction (-), multiplication (*), and division (/). These operations can be performed on numbers.',
        video_url: '/videos/lesson_python_basic_arithmetic.mp4',
        language: 'English',
        created_at: new Date()
      },
      {
        id: 10,
        unit_id: 5,
        title: 'Order of Operation',
        description: 'Understanding the order of operations in Python',
        flash_card: 'Python follows the standard order of operations (PEMDAS/BODMAS): Parentheses/Brackets, Exponents/Orders, Multiplication and Division (from left to right), Addition and Subtraction (from left to right).',
        video_url: '/videos/lesson_python_order_of_operation.mp4',
        language: 'English',
        created_at: new Date()
      },
      {
        id: 11,
        unit_id: 5,
        title: 'Working with Strings and Numbers in Python',
        description: 'Combining strings and numbers in Python',
        flash_card: 'You can convert numbers to strings using the str() function and concatenate them with other strings. Similarly, you can convert strings to numbers using int() or float() functions.',
        video_url: '/videos/lesson_python_strings_and_numbers.mp4',
        language: 'English',
        created_at: new Date()
      },
      {
        id: 12,
        unit_id: 6,
        title: 'Comparison Operators (==, <, >)',
        description: 'Introduction to comparison operators in Python',
        flash_card: 'Comparison operators are used to compare values: == (equal to), != (not equal to), < (less than), > (greater than), <= (less than or equal to), >= (greater than or equal to).',
        video_url: '/videos/lesson_python_comparison_operators.mp4',
        language: 'English',
        created_at: new Date()
      },
      {
        id: 13,
        unit_id: 6,
        title: 'If Statement',
        description: 'Introduction to the if statement in Python',
        flash_card: 'The if statement allows you to execute a block of code only if a certain condition is true. If the condition is false, the code block is skipped.',
        video_url: '/videos/lesson_python_if_statement.mp4',
        language: 'English',
        created_at: new Date()
      },
      {
        id: 14,
        unit_id: 6,
        title: 'If Else Statement',
        description: 'Introduction to the if-else statement in Python',
        flash_card: 'The if-else statement allows you to execute one block of code if a condition is true, and another block if the condition is false.',
        video_url: '/videos/lesson_python_if_else_statement.mp4',
        language: 'English',
        created_at: new Date()
      },
      {
        id: 15,
        unit_id: 7,
        title: 'For Loops',
        description: 'Introduction to for loops in Python',
        flash_card: 'A for loop is used to iterate over a sequence (like a list, tuple, or string) and execute a block of code for each item in the sequence.',
        video_url: '/videos/lesson_python_for_loops.mp4',
        language: 'English',
        created_at: new Date()
      },
      {
        id: 16,
        unit_id: 8,
        title: 'Introduction to Lists',
        description: 'Introduction to lists in Python',
        flash_card: 'A list is a collection of items that are ordered and changeable. Lists are written with square brackets and can contain items of different data types.',
        video_url: '/videos/lesson_python_lists_intro.mp4',
        language: 'English',
        created_at: new Date()
      },
      {
        id: 17,
        unit_id: 8,
        title: 'Accessing List Items',
        description: 'How to access items in a list in Python',
        flash_card: 'You can access items in a list by referring to their index. Python uses zero-based indexing, so the first item has an index of 0.',
        video_url: '/videos/lesson_python_accessing_list_items.mp4',
        language: 'English',
        created_at: new Date()
      },
      {
        id: 18,
        unit_id: 8,
        title: 'Concatenation Operation on Lists (+, *)',
        description: 'How to concatenate and repeat lists in Python',
        flash_card: 'You can concatenate lists using the + operator and repeat lists using the * operator. These operations create new lists without modifying the original lists.',
        video_url: '/videos/lesson_python_list_concatenation.mp4',
        language: 'English',
        created_at: new Date()
      },
      {
        id: 19,
        unit_id: 9,
        title: 'What are Functions?',
        description: 'Introduction to functions in Python',
        flash_card: 'A function is a block of reusable code that performs a specific task. Functions help in organizing code and making it more readable and reusable.',
        video_url: '/videos/lesson_python_functions_intro.mp4',
        language: 'English',
        created_at: new Date()
      },
      {
        id: 20,
        unit_id: 9,
        title: 'Built-in Functions',
        description: 'Introduction to built-in functions in Python',
        flash_card: 'Python comes with a set of built-in functions like print(), len(), type(), etc. These functions are always available and can be used without needing to define them.',
        video_url: '/videos/lesson_python_built_in_functions.mp4',
        language: 'English',
        created_at: new Date()
      },
      {
        id: 21,
        unit_id: 9,
        title: 'Syntax of a Function',
        description: 'Understanding the syntax of a function in Python',
        flash_card: 'A function is defined using the def keyword, followed by the function name and parentheses. The code block within the function is indented and executed when the function is called.',
        video_url: '/videos/lesson_python_function_syntax.mp4',
        language: 'English',
        created_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('lessons', null, {});
  }
};