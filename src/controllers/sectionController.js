// const Section = require("../models/section");
// const Unit = require("../models/unit");
// const Lesson = require("../models/lesson");
const { Section, Unit, Lesson, StudentQuiz } = require("../models/index");

//change it to function the export as in the usercontroller
exports.getSectionDetails = async (req, res) => {
  try {
    const sectionId = req.params.id; //eager loading
    const section = await Section.findOne({
      where: { id: sectionId },
      include: [
        {
          model: Unit,
          as: "units",
          include: [{ model: Lesson, as: "lessons" ,  attributes: ["id"] }],
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
      unitName: unit.name, // Assuming Unit model has a 'name' field, adjust if different
      lessons: unit.lessons.map(lesson => ({
        lessonId: lesson.id,
        lessonName: lesson.title,
        flashCard: lesson.flash_card
      }))
    }));

    res.json({
      sectionId: section.id,
      units: flashcardsByUnit
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