const express = require('express');
const router = express.Router();
const motivationController = require('../controllers/motivationController');

router.get('/motivation', motivationController.getMotivationalMessage);

module.exports = router;