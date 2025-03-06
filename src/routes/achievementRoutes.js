
const express = require('express');
const router = express.Router();
const AchievementController = require('../controllers/achievementController');

router.get('/:userId', AchievementController.getUserAchievements);
router.post('/:userId/check-achievements', AchievementController.checkAndUnlockAchievements);

module.exports = router;