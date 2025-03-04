const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const UserController = require('../controllers/userController'); // Import UserController

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  getUserProfileInfo
} = UserController; // Destructure the required methods from UserController

// **Public Routes**
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// **Protected Routes (Require Authentication)**
router.get('/profile', authMiddleware, getUserProfile);

router.get('/profile/:userId', UserController.getUserProfileInfo);

module.exports = router;