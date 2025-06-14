const express = require('express');
const router = express.Router();
const { logEvent } = require('../controllers/analyticsEventController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware); 
router.post('/track-event', logEvent);

module.exports = router;