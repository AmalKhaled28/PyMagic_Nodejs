const express = require("express");
const router = express.Router();
const {
  getSectionDetails,
  getSectionFlashcards,
  checkFlashcardAccess,
} = require("../controllers/sectionController");

const authMiddleware = require('../middlewares/auth');

// Apply the authMiddleware to all routes
router.use(authMiddleware);

router.get("/:id", getSectionDetails);
router.get("/:id/flashcards", getSectionFlashcards);
router.get("/flashcard-access/:user_id/:lesson_id", checkFlashcardAccess);

module.exports = router;