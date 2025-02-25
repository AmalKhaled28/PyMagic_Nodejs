const express = require("express");
const router = express.Router();
const { getSectionDetails } = require("../controllers/sectionController");

/////////////////
const { getSectionFlashcards } = require("../controllers/sectionController");
///////////////

router.get("/:id", getSectionDetails);


router.get("/:id/flashcards", getSectionFlashcards);


module.exports = router;
