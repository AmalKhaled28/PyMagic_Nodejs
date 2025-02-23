const express = require("express");
const { getSections, createSection } = require("../controllers/sectionController");
const router = express.Router();

router.get("/", getSections);
router.post("/", createSection);

module.exports = router;
