
const { Section, Unit, Lesson, StudentQuiz, SectionTranslation, UnitTranslation, LessonTranslation } = require("../models/index");

exports.getSectionDetails = async (req, res) => {
  try {
    const sectionId = req.params.id;
    const userId = req.user.id;
    const language = req.headers["accept-language"] || "en";

    // Fetch current section
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
      order: [[{ model: Unit, as: 'units' }, 'id', 'ASC']],
    });

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    const sectionCount = await Section.count();

    let prevSectionName = "";
    if (parseInt(sectionId) > 1) {
      const prevSection = await Section.findOne({
        where: { id: parseInt(sectionId) - 1 },
        include: [
          {
            model: SectionTranslation,
            as: 'translations',
            where: { language },
            required: false,
            attributes: ['name'],
          },
        ],
      });
      prevSectionName = prevSection?.translations?.[0]?.name || "Unnamed Section";
    }

    let nextSectionName = "";
    if (parseInt(sectionId) < sectionCount) {
      const nextSection = await Section.findOne({
        where: { id: parseInt(sectionId) + 1 },
        include: [
          {
            model: SectionTranslation,
            as: 'translations',
            where: { language },
            required: false,
            attributes: ['name'],
          },
        ],
      });
      nextSectionName = nextSection?.translations?.[0]?.name || "Unnamed Section";
    }

    const formattedSection = {
      id: section.id,
      sectionCount: sectionCount,
      name: section.translations.length > 0 ? section.translations[0].name : "Unnamed Section",
      prevSectionName, 
      nextSectionName, 
      units: section.units.map(unit => ({
        id: unit.id,
        name: unit.translations.length > 0 ? unit.translations[0].name : "Unnamed Unit",
        lessons: unit.lessons.map(lesson => ({
          id: lesson.id,
          title: lesson.translations.length > 0 ? lesson.translations[0].title : "Unnamed Lesson",
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
      order: [
        [{ model: Unit, as: 'units' }, 'id', 'ASC'],
        [{ model: Unit, as: 'units' }, { model: Lesson, as: 'lessons' }, 'id', 'ASC']
      ],
    });

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    // Get section count
    const sectionCount = await Section.count();

    const sectionName = section.translations.length > 0 
      ? section.translations[0].name 
      : "Unnamed Section";

    let prevSectionName = "";
    if (parseInt(sectionId) > 1) {
      const prevSection = await Section.findOne({
        where: { id: parseInt(sectionId) - 1 },
        include: [
          {
            model: SectionTranslation,
            as: 'translations',
            where: { language },
            required: false,
            attributes: ['name'],
          },
        ],
      });
      prevSectionName = prevSection?.translations?.[0]?.name || "Unnamed Section";
    }

    let nextSectionName = "";
    if (parseInt(sectionId) < sectionCount) {
      const nextSection = await Section.findOne({
        where: { id: parseInt(sectionId) + 1 },
        include: [
          {
            model: SectionTranslation,
            as: 'translations',
            where: { language },
            required: false,
            attributes: ['name'],
          },
        ],
      });
      nextSectionName = nextSection?.translations?.[0]?.name || "Unnamed Section";
    }

    const flashcardsByUnit = section.units.map(unit => ({
      unitId: unit.id,
      unitName: unit.translations.length > 0 
        ? unit.translations[0].name 
        : "Unnamed Unit",
      lessons: unit.lessons.map((lesson, index) => ({
        lessonId: lesson.id,
        lessonName: lesson.translations.length > 0 
          ? lesson.translations[0].title 
          : "Unnamed Lesson",
        lessonNumber: index + 1,
        flashCard: lesson.translations.length > 0 
          ? lesson.translations[0].flash_card 
          : null,
        isPassed: lesson.quizzes && lesson.quizzes.length > 0 
          ? lesson.quizzes[0].is_passed 
          : false,
      })),
    }));

    res.json({
      sectionId: section.id,
      sectionName: sectionName,
      sectionCount: sectionCount, 
      prevSectionName, 
      nextSectionName, 
      units: flashcardsByUnit,
    });
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    res.status(500).json({ 
      message: "Server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

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
      return res.status(200).json({
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


exports.checkNextSectionAccess = async (req, res) => {
  try {
    const { user_id, section_id } = req.params;

    if (!user_id || !section_id) {
      return res.status(400).json({ success: false, message: "User ID and Section ID are required" });
    }

    const lastUnit = await Unit.findOne({
      where: { section_id },
      order: [['id', 'DESC']],
    });

    if (!lastUnit) {
      return res.status(404).json({ success: false, message: "No units found in this section" });
    }

    const lastUnitQuiz = await StudentQuiz.findOne({
      where: {
        user_id,
        unit_id: lastUnit.id,
        lesson_id: null, 
        is_passed: true,
      },
    });

    if (!lastUnitQuiz) {
      return res.status(403).json({
        success: false,
        message: "You must pass the last unit quiz in this section to access the next section",
      });
    }

    return res.json({
      success: true,
      message: "Access granted to next section",
    });
  } catch (error) {
    console.error("Error checking next section access:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};