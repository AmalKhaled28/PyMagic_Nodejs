const { Section, Unit, Lesson, StudentQuiz, SectionTranslation, UnitTranslation, LessonTranslation } = require("../models/index");

exports.getSectionDetails = async (req, res) => {
  try {
    const sectionId = req.params.id;
    const userId = req.user.id; // Assuming user ID is available from auth middleware
    
    const language = req.headers["accept-language"] || "en";

    const section = await Section.findOne({
      where: { id: sectionId },
      attributes: ['id', 'created_at', 'updated_at'],
      include: [
        {
          model: SectionTranslation,
          as: 'translations',
          where: { language },
          required: false,
          attributes: ['name'],
        },
        {
          model: Unit,
          as: "units",
          attributes: ['id', 'section_id', 'created_at', 'updated_at'],
          include: [
            {
              model: UnitTranslation,
              as: 'translations',
              where: { language },
              required: false,
              attributes: ['name'],
            },
            {
              model: Lesson,
              as: "lessons",
              attributes: ['id', 'unit_id', 'created_at', 'updated_at'],
              include: [
                {
                  model: LessonTranslation,
                  as: 'translations',
                  where: { language },
                  required: false,
                  attributes: ['title'],
                },
                {
                  model: StudentQuiz,
                  as: "quizzes",
                  where: { user_id: userId },
                  required: false,
                  attributes: ["id", "is_passed"],
                },
              ],
            },
            {
              model: StudentQuiz,
              as: "quizzes",
              where: { user_id: userId, lesson_id: null },
              required: false,
              attributes: ["id", "is_passed"],
            },
          ],
        },
      ],
      order: [[{ model: Unit, as: 'units' }, 'id', 'ASC']], // Sort units by id in ascending order
    });

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    const sectionCount = await Section.count();

    // Format response to include translated names
    const formattedSection = {
      id: section.id,
      sectionCount : sectionCount,
      name: section.translations.length > 0 ? section.translations[0].name : "Unnamed Section", // Fallback if no translation
      units: section.units.map(unit => ({
        id: unit.id,
        name: unit.translations.length > 0 ? unit.translations[0].name : "Unnamed Unit", // Fallback if no translation
        lessons: unit.lessons.map(lesson => ({
          id: lesson.id,
          title: lesson.translations.length > 0 ? lesson.translations[0].title : "Unnamed Lesson", // Fallback if no translation
          quizzes: lesson.quizzes,
        })),
        quizzes: unit.quizzes,
      })),
    };

    res.json(formattedSection);
  } catch (error) {
    console.error("Error fetching section details:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Update getSectionFlashcards to also sort units and use Arabic
// exports.getSectionDetails = async (req, res) => {
//   try {
//     const sectionId = req.params.id;
//     const userId = req.user.id; // Assuming user ID is available from auth middleware
//     const language = req.headers["accept-language"] || "en";

//     // Get the section with all related data
//     const section = await Section.findOne({
//       where: { id: sectionId },
//       attributes: ['id', 'created_at', 'updated_at'],
//       include: [
//         {
//           model: SectionTranslation,
//           as: 'translations',
//           attributes: ['name', 'language'],
//           // Get all translations and filter later for better fallback handling
//         },
//         {
//           model: Unit,
//           as: "units",
//           attributes: ['id', 'section_id', 'created_at', 'updated_at'],
//           include: [
//             {
//               model: UnitTranslation,
//               as: 'translations',
//               attributes: ['name', 'language'],
//             },
//             {
//               model: Lesson,
//               as: "lessons",
//               attributes: ['id', 'unit_id', 'created_at', 'updated_at'],
//               include: [
//                 {
//                   model: LessonTranslation,
//                   as: 'translations',
//                   attributes: ['title', 'language'],
//                 },
//                 {
//                   model: StudentQuiz,
//                   as: "quizzes",
//                   where: { user_id: userId },
//                   required: false,
//                   attributes: ["id", "is_passed"],
//                 },
//               ],
//             },
//             {
//               model: StudentQuiz,
//               as: "quizzes",
//               where: { user_id: userId, lesson_id: null },
//               required: false,
//               attributes: ["id", "is_passed"],
//             },
//           ],
//         },
//       ],
//       order: [
//         [{ model: Unit, as: 'units' }, 'id', 'ASC'],
//         [{ model: Unit, as: 'units' }, { model: Lesson, as: 'lessons' }, 'id', 'ASC']
//       ],
//     });

//     if (!section) {
//       return res.status(404).json({ message: "Section not found" });
//     }

//     const sectionCount = await Section.count();

//     // Helper function to get the best available translation
//     const getTranslation = (translations, preferredLanguage, field = 'name') => {
//       if (!translations || translations.length === 0) return `Unnamed ${field === 'title' ? 'Lesson' : field === 'name' ? 'Unit' : 'Section'}`;
      
//       // Try preferred language first
//       const preferred = translations.find(t => t.language === preferredLanguage);
//       if (preferred) return preferred[field];
      
//       // Fallback to English
//       const english = translations.find(t => t.language === 'en');
//       if (english) return english[field];
      
//       // Fallback to first available
//       return translations[0][field];
//     };

//     // Format the response
//     const formattedSection = {
//       id: section.id,
//       sectionCount,
//       name: getTranslation(section.translations, language),
//       units: section.units.map(unit => ({
//         id: unit.id,
//         name: getTranslation(unit.translations, language),
//         lessons: unit.lessons.map(lesson => ({
//           id: lesson.id,
//           title: getTranslation(lesson.translations, language, 'title'),
//           quizzes: lesson.quizzes,
//         })),
//         quizzes: unit.quizzes,
//       })),
//       createdAt: section.created_at,
//       updatedAt: section.updated_at,
//     };

//     res.json({
//       success: true,
//       data: formattedSection
//     });
//   } catch (error) {
//     console.error("Error fetching section details:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Server error while fetching section details",
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };


exports.getSectionFlashcards = async (req, res) => {
  try {
    const sectionId = req.params.id;
    const userId = req.user.id;
    const language = req.headers["accept-language"] || "en";

    const section = await Section.findOne({
      where: { id: sectionId },
      attributes: ['id', 'created_at', 'updated_at'],
      include: [
        {
          model: Unit,
          as: "units",
          attributes: ['id', 'section_id', 'created_at', 'updated_at'],
          include: [
            {
              model: UnitTranslation,
              as: 'translations',
              where: { language },
              required: false,
              attributes: ['name'],
            },
            {
              model: Lesson,
              as: "lessons",
              attributes: ['id', 'unit_id', 'created_at', 'updated_at'],
              include: [
                {
                  model: LessonTranslation,
                  as: 'translations',
                  where: { language },
                  required: false,
                  attributes: ['title', 'flash_card'],
                },
                {
                  model: StudentQuiz,
                  as: "quizzes",
                  where: { user_id: userId },
                  required: false,
                  attributes: ["id", "is_passed"],
                },
              ],
            },
          ],
        },
      ],
      order: [[{ model: Unit, as: 'units' }, 'id', 'ASC']], // Sort units by id in ascending order
    });

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    // Group flashcards by unit with translated data
    const flashcardsByUnit = section.units.map(unit => ({
      unitId: unit.id,
      unitName: unit.translations.length > 0 ? unit.translations[0].name : "Unnamed Unit",
      lessons: unit.lessons.map((lesson, index) => ({
        lessonId: lesson.id,
        lessonName: lesson.translations.length > 0 ? lesson.translations[0].title : "Unnamed Lesson",
        lessonNumber: index + 1,
        flashCard: lesson.translations.length > 0 ? lesson.translations[0].flash_card : null,
        isPassed: lesson.quizzes && lesson.quizzes.length > 0 ? lesson.quizzes[0].is_passed : false,
      })),
    }));

    res.json({
      sectionId: section.id,
      units: flashcardsByUnit,
    });
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// checkFlashcardAccess remains unchanged as it doesn't deal with translations or ordering
exports.checkFlashcardAccess = async (req, res) => {
  try {
    const { user_id, lesson_id } = req.params;

    if (!user_id || !lesson_id) {
      return res.status(400).json({ message: "User ID and Lesson ID are required" });
    }

    const quiz = await StudentQuiz.findOne({
      where: {
        user_id,
        lesson_id,
        is_passed: true,
      },
    });

    if (!quiz) {
      return res.status(403).json({
        message: "You must pass the lesson quiz to access this flashcard",
        accessGranted: false,
      });
    }

    res.json({
      message: "Access granted to flashcard",
      accessGranted: true,
    });
  } catch (error) {
    console.error("Error checking flashcard access:", error);
    res.status(500).json({ message: "Server error" });
  }
};