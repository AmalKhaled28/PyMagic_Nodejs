const express = require("express");
const router = express.Router();
const {
  getSectionDetails,
  getSectionFlashcards,
  checkFlashcardAccess,
  checkNextSectionAccess,
} = require("../controllers/sectionController");

const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get("/:id", getSectionDetails);
router.get("/:id/flashcards", getSectionFlashcards);
router.get("/flashcard-access/:user_id/:lesson_id", checkFlashcardAccess);
router.get("/check-next-section-access/:user_id/:section_id", checkNextSectionAccess);

module.exports = router;