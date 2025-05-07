"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First insert base lessons (without localized content)
    await queryInterface.bulkInsert(
      "lessons",
      [
        { id: 1, unit_id: 1, created_at: new Date(), updated_at: new Date() },
        { id: 2, unit_id: 2, created_at: new Date(), updated_at: new Date() },
        { id: 3, unit_id: 2, created_at: new Date(), updated_at: new Date() },
        { id: 4, unit_id: 2, created_at: new Date(), updated_at: new Date() },
        { id: 5, unit_id: 2, created_at: new Date(), updated_at: new Date() },
        { id: 6, unit_id: 3, created_at: new Date(), updated_at: new Date() },
        { id: 7, unit_id: 3, created_at: new Date(), updated_at: new Date() },
        { id: 8, unit_id: 4, created_at: new Date(), updated_at: new Date() },
        { id: 9, unit_id: 5, created_at: new Date(), updated_at: new Date() },
        { id: 10, unit_id: 5, created_at: new Date(), updated_at: new Date() },
        { id: 11, unit_id: 5, created_at: new Date(), updated_at: new Date() },
        { id: 12, unit_id: 6, created_at: new Date(), updated_at: new Date() },
        { id: 13, unit_id: 6, created_at: new Date(), updated_at: new Date() },
        { id: 14, unit_id: 6, created_at: new Date(), updated_at: new Date() },
        { id: 15, unit_id: 7, created_at: new Date(), updated_at: new Date() },
        { id: 16, unit_id: 8, created_at: new Date(), updated_at: new Date() },
        { id: 17, unit_id: 8, created_at: new Date(), updated_at: new Date() },
        { id: 18, unit_id: 8, created_at: new Date(), updated_at: new Date() },
        { id: 19, unit_id: 9, created_at: new Date(), updated_at: new Date() },
        { id: 20, unit_id: 9, created_at: new Date(), updated_at: new Date() },
        { id: 21, unit_id: 9, created_at: new Date(), updated_at: new Date() },
      ],
      {}
    );

    // Then insert translations (English and Arabic)
    await queryInterface.bulkInsert(
      "lesson_translations",
      [
        // English Translations
        {
          id: 1,
          lesson_id: 1,
          language: "en",
          title: "What is Programming?",
          flash_card:
            "Programming is like asking a computer to do something for you, just like asking your mom for a sandwich. Instead of words, we use special languages to tell computers what to do!",
          video_url: "/videos/lesson_programming_intro.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          lesson_id: 2,
          language: "en",
          title: "Python Introduction",
          flash_card:
            "Python is a simple programming language that helps us give instructions to a computer. You can use it to solve math problems, draw pictures, or even make games!",
          video_url: "/videos/lesson_python_intro.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          lesson_id: 3,
          language: "en",
          title: "Python Print",
          flash_card:
            "The print function tells the computer to show something on the screen, like words, numbers, or math results. It's great for checking what your code does!",
          video_url: "/videos/lesson_python_print.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          lesson_id: 4,
          language: "en",
          title: "Python Comments",
          flash_card:
            'Comments are notes in your code to explain what it does. The computer ignores them. Single-line comment: Starts with #. Multi-line comment: Uses triple quotes """ or \'.',
          video_url: "/videos/lesson_python_comments.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          lesson_id: 5,
          language: "en",
          title: "Python Data Types",
          flash_card:
            'Python uses data types to organize and communicate information: Numbers: Integers (x = 5), Floats (x = 3.5), Strings (x = "Hello!"), Booleans (x = True or False).',
          video_url: "/videos/lesson_python_data_types.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          lesson_id: 6,
          language: "en",
          title: "What are Variables?",
          flash_card:
            "Variables are like boxes where we store information to use later. Create a variable: Use = to store information (phone = 0123456789). Use a variable: Write the variable's name to access its value (print(phone)).",
          video_url: "/videos/lesson_python_variables.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7,
          lesson_id: 7,
          language: "en",
          title: "Naming Variables",
          flash_card:
            "Use meaningful names (e.g., name, phone). Start with a letter (e.g., phone_number, not 1st_phone). Numbers can come after the first letter (e.g., user1). No spaces (e.g., student_name, not student name). Use lowercase and separate words with underscores (e.g., first_name).",
          video_url: "/videos/lesson_python_variable_naming.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 8,
          lesson_id: 8,
          language: "en",
          title: "String Operators (+, *)",
          flash_card:
            "String operators allow you to manipulate strings. The + operator concatenates strings, while the * operator repeats a string a specified number of times.",
          video_url: "/videos/lesson_python_string_operators.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9,
          lesson_id: 9,
          language: "en",
          title: "Basic Arithmetic in Python (+, -, *, /)",
          flash_card:
            "Python supports basic arithmetic operations: addition (+), subtraction (-), multiplication (*), and division (/). These operations can be performed on numbers.",
          video_url: "/videos/lesson_python_basic_arithmetic.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 10,
          lesson_id: 10,
          language: "en",
          title: "Order of Operation",
          flash_card:
            "Python follows the standard order of operations (PEMDAS/BODMAS): Parentheses/Brackets, Exponents/Orders, Multiplication and Division (from left to right), Addition and Subtraction (from left to right).",
          video_url: "/videos/lesson_python_order_of_operation.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 11,
          lesson_id: 11,
          language: "en",
          title: "Working with Strings and Numbers in Python",
          flash_card:
            "You can convert numbers to strings using the str() function and concatenate them with other strings. Similarly, you can convert strings to numbers using int() or float() functions.",
          video_url: "/videos/lesson_python_strings_and_numbers.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 12,
          lesson_id: 12,
          language: "en",
          title: "Comparison Operators (==, <, >)",
          flash_card:
            "Comparison operators are used to compare values: == (equal to), != (not equal to), < (less than), > (greater than), <= (less than or equal to), >= (greater than or equal to).",
          video_url: "/videos/lesson_python_comparison_operators.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 13,
          lesson_id: 13,
          language: "en",
          title: "If Statement",
          flash_card:
            "The if statement allows you to execute a block of code only if a certain condition is true. If the condition is false, the code block is skipped.",
          video_url: "/videos/lesson_python_if_statement.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 14,
          lesson_id: 14,
          language: "en",
          title: "If Else Statement",
          flash_card:
            "The if-else statement allows you to execute one block of code if a condition is true, and another block if the condition is false.",
          video_url: "/videos/lesson_python_if_else_statement.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 15,
          lesson_id: 15,
          language: "en",
          title: "For Loops",
          flash_card:
            "A for loop is used to iterate over a sequence (like a list, tuple, or string) and execute a block of code for each item in the sequence.",
          video_url: "/videos/lesson_python_for_loops.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 16,
          lesson_id: 16,
          language: "en",
          title: "Introduction to Lists",
          flash_card:
            "A list is a collection of items that are ordered and changeable. Lists are written with square brackets and can contain items of different data types.",
          video_url: "/videos/lesson_python_lists_intro.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 17,
          lesson_id: 17,
          language: "en",
          title: "Accessing List Items",
          flash_card:
            "You can access items in a list by referring to their index. Python uses zero-based indexing, so the first item has an index of 0.",
          video_url: "/videos/lesson_python_accessing_list_items.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 18,
          lesson_id: 18,
          language: "en",
          title: "Concatenation Operation on Lists (+, *)",
          flash_card:
            "You can concatenate lists using the + operator and repeat lists using the * operator. These operations create new lists without modifying the original lists.",
          video_url: "/videos/lesson_python_list_concatenation.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 19,
          lesson_id: 19,
          language: "en",
          title: "What are Functions?",
          flash_card:
            "A function is a block of reusable code that performs a specific task. Functions help in organizing code and making it more readable and reusable.",
          video_url: "/videos/lesson_python_functions_intro.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 20,
          lesson_id: 20,
          language: "en",
          title: "Built-in Functions",
          flash_card:
            "Python comes with a set of built-in functions like print(), len(), type(), etc. These functions are always available and can be used without needing to define them.",
          video_url: "/videos/lesson_python_built_in_functions.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 21,
          lesson_id: 21,
          language: "en",
          title: "Syntax of a Function",
          flash_card:
            "A function is defined using the def keyword, followed by the function name and parentheses. The code block within the function is indented and executed when the function is called.",
          video_url: "/videos/lesson_python_function_syntax.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Arabic Translations
        {
          id: 22,
          lesson_id: 1,
          language: "ar",
          title: "ما هي الـ Programming؟",
          flash_card:
            "الـ Programming هي عملية إعطاء تعليمات للكممبيوتر، مثلما تطلب من شخص تنفيذ مهمة. بدلاً من اللغة العادية، نستخدم لغات برمجة مثل Python لكتابة هذه التعليمات!",
          video_url: "/videos/lesson_programming_intro_ar.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 23,
          lesson_id: 2,
          language: "ar",
          title: "مقدمة في لغة Python",
          flash_card:
            "Python هي لغة برمجة سهلة لكتابة تعليمات الكمبيوتر. يمكنك استخدامها لحل مسائل رياضية، معالجة بيانات، أو حتى تطوير ألعاب!",
          video_url: "/videos/lesson_python_intro_ar.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 24,
          lesson_id: 3,
          language: "ar",
          title: "دالة print في Python",
          flash_card:
            "دالة print تُظهر النتائج على الشاشة. يمكنك استخدامها لعرض نصوص، أرقام، أو نتائج عمليات حسابية. مثال: print('مرحباً') سيظهر 'مرحباً' على الشاشة.",
          video_url: "/videos/lesson_python_print_ar.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 25,
          lesson_id: 4,
          language: "ar",
          title: "الـ Comments في Python",
          flash_card:
            "الـ Comments هي ملاحظات توضح عمل الكود ولا تؤثر على التنفيذ. للسطر الواحد نستخدم # وللتعليقات الطوحة نستخدم \"\"\" أو '''.",
          video_url: "/videos/lesson_python_comments_ar.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 26,
          lesson_id: 5,
          language: "ar",
          title: "أنواع الـ Data Types في Python",
          flash_card:
            "Python تدعم أنواع بيانات مختلفة: Integers (أعداد صحيحة)، Floats (أعداد عشرية)، Strings (نصوص)، و Booleans (قيم منطقية True/False).",
          video_url: "/videos/lesson_python_data_types_ar.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 27,
          lesson_id: 6,
          language: "ar",
          title: "ما هي الـ Variables؟",
          flash_card:
            "الـ Variables هي أماكن تخزين للبيانات في الذاكرة. ننشئها باستخدام = مثل x = 5، ونستخدمها بكتابة اسمها مثل print(x).",
          video_url: "/videos/lesson_python_variables_ar.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 28,
          lesson_id: 7,
          language: "ar",
          title: "تسمية الـ Variables",
          flash_card:
            "قواعد تسمية المتغيرات: تبدأ بحرف (مثل userName)، يمكن أن تحتوي أرقام (user1)، لا مسافات (استخدم _)، وحساسة لحالة الأحرف (Name مختلف عن name).",
          video_url: "/videos/lesson_python_variable_naming_ar.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 29,
          lesson_id: 8,
          language: "ar",
          title: "عمليات الـ Strings (+, *)",
          flash_card:
            "يمكن دمج Strings باستخدام + مثل 'Hello' + 'World' = 'HelloWorld'، وتكرارها باستخدام * مثل 'Hi' * 3 = 'HiHiHi'.",
          video_url: "/videos/lesson_python_string_operators_ar.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 30,
          lesson_id: 9,
          language: "ar",
          title: "العمليات الحسابية في Python (+, -, *, /)",
          flash_card:
            "Python تدعم العمليات الحسابية الأساسية: الجمع (+)، الطرح (-)، الضرب (*)، والقسمة (/). مثال: 5 + 3 * 2 = 11.",
          video_url: "/videos/lesson_python_basic_arithmetic_ar.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 31,
          lesson_id: 10,
          language: "ar",
          title: "ترتيب العمليات (Order of Operations)",
          flash_card:
            "Python تتبع ترتيب العمليات: الأقواس أولاً، ثم الأسس، ثم الضرب والقسمة، وأخيراً الجمع والطرح (PEMDAS/BODMAS).",
          video_url: "/videos/lesson_python_order_of_operation_ar.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 32,
          lesson_id: 11,
          language: "ar",
          title: "العمل مع Strings و Numbers",
          flash_card:
            "لتحويل Numbers إلى Strings استخدم str() مثل str(5)، وللتحويل العكسي استخدم int() أو float() مثل int('10').",
          video_url: "/videos/lesson_python_strings_and_numbers_ar.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 33,
          lesson_id: 12,
          language: "ar",
          title: "عوامل المقارنة (Comparison Operators)",
          flash_card:
            "عوامل المقارنة في Python: == (يساوي)، != (لا يساوي)، < (أصغر من)، > (أكبر من)، <= (أصغر أو يساوي)، >= (أكبر أو يساوي).",
          video_url: "/videos/lesson_python_comparison_operators_ar.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 34,
          lesson_id: 13,
          language: "ar",
          title: "جملة if الشرطية",
          flash_card:
            "جملة if تنفذ كوداً إذا تحقق الشرط. مثال: if x > 5: print('أكبر من 5').",
          video_url: "/videos/lesson_python_if_statement_ar.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 35,
          lesson_id: 14,
          language: "ar",
          title: "جملة if-else الشرطية",
          flash_card:
            "جملة if-else تنفذ كوداً إذا تحقق الشرط، وكوداً آخر إذا لم يتحقق. مثال: if x > 5: print('أكبر') else: print('أصغر أو يساوي').",
          video_url: "/videos/lesson_python_if_else_statement_ar.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 36,
          lesson_id: 15,
          language: "ar",
          title: "حلقات for",
          flash_card:
            "حلقات for تُكرر تنفيذ كود لكل عنصر في sequence مثل list أو string. مثال: for x in [1,2,3]: print(x) ستطبع الأرقام 1، 2، 3.",
          video_url: "/videos/lesson_python_for_loops_ar.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 37,
          lesson_id: 16,
          language: "ar",
          title: "مقدمة عن Lists",
          flash_card:
            "الـ Lists في Python هي مجموعات مرتبة وقابلة للتغيير. تُعرف بأقواس مربعة مثل my_list = [1, 'a', True].",
          video_url: "/videos/lesson_python_lists_intro_ar.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 38,
          lesson_id: 17,
          language: "ar",
          title: "الوصول إلى عناصر List",
          flash_card:
            "للوصول إلى عناصر List نستخدم الأندكس الذي يبدأ من الصفر. مثال: list[0] يعطي العنصر الأول، list[-1] يعطي العنصر الأخير.",
          video_url: "/videos/lesson_python_accessing_list_items_ar.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 39,
          lesson_id: 18,
          language: "ar",
          title: "عمليات List (+, *)",
          flash_card:
            "يمكن دمج Lists باستخدام + مثل [1,2] + [3,4] = [1,2,3,4]، وتكرارها باستخدام * مثل [0] * 3 = [0,0,0].",
          video_url: "/videos/lesson_python_list_concatenation_ar.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 40,
          lesson_id: 19,
          language: "ar",
          title: "ما هي الـ Functions؟",
          flash_card:
            "الـ Functions هي كتل كود قابلة لإعادة الاستخدام. تُعرّف بـ def وتُنفذ عند استدعائها. مثال: def greet(): print('مرحباً') ثم greet().",
          video_url: "/videos/lesson_python_functions_intro_ar.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 41,
          lesson_id: 20,
          language: "ar",
          title: "الـ Built-in Functions",
          flash_card:
            "Python توفر دوال جاهزة مثل print() للإخراج، len() لقياس الطول، type() لمعرفة نوع البيانات، وغيرها الكثير.",
          video_url: "/videos/lesson_python_built_in_functions_ar.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 42,
          lesson_id: 21,
          language: "ar",
          title: "تركيب الـ Function",
          flash_card:
            "تركيب الدالة: def function_name(parameters): ثم الكود المُزاح. مثال: def add(x,y): return x+y ثم add(2,3) سيعيد 5.",
          video_url: "/videos/lesson_python_function_syntax_ar.mp4",
          created_at: new Date(),
          updated_at: new Date(),
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // First delete translations to maintain referential integrity
    await queryInterface.bulkDelete("lesson_translations", null, {});
    // Then delete lessons
    await queryInterface.bulkDelete("lessons", null, {});
  },
};
