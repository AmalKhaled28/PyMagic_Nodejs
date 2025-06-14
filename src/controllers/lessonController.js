const { Lesson, LessonTranslation } = require("../models/index");

exports.getLessonDetails = async (req, res) => {
    try {
        const lessonId = req.params.id;
        const language = req.headers["accept-language"] || "en";

        const lesson = await Lesson.findOne({ 
          where: { id: lessonId },
          include: [
            {
              model: LessonTranslation,
              as: 'translations',
              where: { language },
              required: false,
              attributes: ['title','video_url'],
            }
          ]
        });
    
        if (!lesson) {
          return res.status(404).json({ message: "Lesson not found" });
        }

        const responseData = {
            id: lesson.id,
            unit_id: lesson.unit_id,
            title: lesson.translations[0]?.title,
            video_url: lesson.translations[0]?.video_url,
            created_at: lesson.created_at,
            updated_at: lesson.updated_at
        };
        res.json({ 
            message: "Lesson retrieved successfully",
            lesson: responseData 
        }); 
          
      } catch (error) {
        console.error("Error updating lesson details:", error);
        res.status(500).json({ message: "Server error" });
      }
};