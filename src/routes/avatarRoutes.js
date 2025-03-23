const express = require('express');
const router = express.Router();
const avatarController = require('../controllers/avatarController');
const authMiddleware = require('../middlewares/auth');


router.use(authMiddleware);

router.post('/save-preferences', avatarController.savePreferences);
router.get('/user-preferences/:userId', avatarController.getUserPreferences);
router.get('/assets', avatarController.getAssets);
router.get('/user/:id/owned-assets', avatarController.getOwnedAssets);
router.post('/buy', avatarController.buyItem);

module.exports = router;