// const Lesson = require('../models/lesson');

// exports.getAllLessons = async (req, res) => {
//     try {
//         const lessons = await Lesson.findAll();
//         res.json(lessons);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.getLessonById = async (req, res) => {
//     try {
//         const lesson = await Lesson.findByPk(req.params.id);
//         if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
//         res.json(lesson);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.createLesson = async (req, res) => {
//     try {
//         const lesson = await Lesson.create(req.body);
//         res.status(201).json(lesson);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.updateLesson = async (req, res) => {
//     try {
//         const lesson = await Lesson.findByPk(req.params.id);
//         if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

//         await lesson.update(req.body);
//         res.json(lesson);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.deleteLesson = async (req, res) => {
//     try {
//         const lesson = await Lesson.findByPk(req.params.id);
//         if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

//         await lesson.destroy();
//         res.json({ message: 'Lesson deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };


const Lesson = require('../models/lesson');

exports.getLessonDetails = async (req, res) => {
    try {
        const lessonId = req.params.id;
        const { video_url } = req.body; // Or other fields you want to update
    
        const lesson = await Lesson.findOne({ where: { id: lessonId } });
    
        if (!lesson) {
          return res.status(404).json({ message: "Lesson not found" });
        }
    
        await lesson.update({ video_url }); // Update only the video_url (or other fields)
    
        res.json({ message: "Lesson updated successfully", lesson });
      } catch (error) {
        console.error("Error updating lesson details:", error);
        res.status(500).json({ message: "Server error" });
      }
};