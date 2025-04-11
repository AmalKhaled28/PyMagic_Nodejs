const express = require("express");
const router = express.Router();
const {
  getSectionDetails,
  getSectionFlashcards,
  checkFlashcardAccess,
  // getSectionLessons
} = require("../controllers/sectionController");

const authMiddleware = require('../middlewares/auth');

// Apply the authMiddleware to all routes
router.use(authMiddleware);

router.get("/:id", getSectionDetails);
router.get("/:id/flashcards", getSectionFlashcards);
// router.get("/:id/lessons", getSectionLessons); // Add the new route
router.get("/flashcard-access/:user_id/:lesson_id", checkFlashcardAccess);

module.exports = router;