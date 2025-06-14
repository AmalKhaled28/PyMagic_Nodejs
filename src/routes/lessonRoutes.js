const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);


router.get("/lessons/:id", lessonController.getLessonDetails);

module.exports = router;