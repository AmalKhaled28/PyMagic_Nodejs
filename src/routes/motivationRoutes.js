const express = require('express');
const router = express.Router();
const motivationController = require('../controllers/motivationController');

// Route to fetch a motivational message
router.get('/motivation', motivationController.getMotivationalMessage);

module.exports = router;