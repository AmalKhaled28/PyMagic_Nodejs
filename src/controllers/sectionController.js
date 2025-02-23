// const Section = require("../models/section");
// const Unit = require("../models/unit");
// const Lesson = require("../models/lesson");
const { Section, Unit, Lesson } = require("../models/index");

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
