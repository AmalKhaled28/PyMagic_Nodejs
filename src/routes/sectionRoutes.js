const express = require("express");
const router = express.Router();
const { getSectionDetails } = require("../controllers/sectionController");

router.get("/:id", getSectionDetails);

module.exports = router;
