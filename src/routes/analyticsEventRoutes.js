const express = require('express');
const router = express.Router();
const { logEvent } = require('../controllers/analyticsEventController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware); // Apply authentication middleware to all routes
// Route to log an analytics event
router.post('/track-event', logEvent);

module.exports = router;