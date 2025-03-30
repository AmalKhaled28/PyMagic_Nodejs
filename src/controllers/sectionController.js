// const Section = require("../models/section");
// const Unit = require("../models/unit");
// const Lesson = require("../models/lesson");
const { Section, Unit, Lesson, StudentQuiz } = require("../models/index");


exports.getSectionDetails = async (req, res) => {
  try {
    const sectionId = req.params.id;
    const userId = req.user.id; // Assuming user ID is available from auth middleware

    const section = await Section.findOne({
      where: { id: sectionId },
      include: [
        {
          model: Unit,
          as: "units",
          include: [
            {
              model: Lesson,
              as: "lessons",
              attributes: ["id", "title"], // Include title for clarity
              include: [
                {
                  model: StudentQuiz,
                  as: "quizzes",
                  where: { user_id: userId },
                  required: false, // Left join to include lessons without quizzes
                  attributes: ["id", "is_passed"],
                },
              ],
            },
            {
              model: StudentQuiz,
              as: "quizzes",
              where: { user_id: userId, lesson_id: null }, // Unit-level quizzes
              required: false,
              attributes: ["id", "is_passed"],
            },
          ],
        },
      ],
    });

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json(section);
  } catch (error) {
    console.error("Error fetching section details:", error);
    res.status(500).json({ message: "Server error" });
  }
};



exports.getSectionFlashcards = async (req, res) => {
  try {
    const sectionId = req.params.id;
    const userId = req.user.id; // Assuming user ID is available from auth middleware

    const section = await Section.findOne({
      where: { id: sectionId },
      include: [
        {
          model: Unit,
          as: "units",
          include: [
            {
              model: Lesson,
              as: "lessons",
              attributes: ["id", "title", "flash_card"],
              include: [
                {
                  model: StudentQuiz,
                  as: "quizzes",
                  where: { user_id: userId },
                  required: false, // Left join to include lessons without quizzes
                  attributes: ["id", "is_passed"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    // Group flashcards by unit
    const flashcardsByUnit = section.units.map(unit => ({
      unitId: unit.id,
      unitName: unit.name,
      lessons: unit.lessons.map((lesson, index) => ({
        lessonId: lesson.id,
        lessonName: lesson.title,
        lessonNumber: index + 1, // Add lesson number within the unit
        flashCard: lesson.flash_card,
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

exports.checkFlashcardAccess = async (req, res) => {
  try {
    const { user_id, lesson_id } = req.params;

    if (!user_id || !lesson_id) {
      return res.status(400).json({ message: "User ID and Lesson ID are required" });
    }

    // Check if the user has passed the quiz for this lesson
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