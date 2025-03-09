const express = require("express");
const router = express.Router();
const {
  getSectionDetails,
  getSectionFlashcards,
  checkFlashcardAccess, // Add the new controller function
} = require("../controllers/sectionController");

router.get("/:id", getSectionDetails);
router.get("/:id/flashcards", getSectionFlashcards);
router.get("/flashcard-access/:user_id/:lesson_id", checkFlashcardAccess); // New route

module.exports = router;