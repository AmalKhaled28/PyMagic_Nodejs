const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserProfile
} = require('../controllers/userController');

// **Public Routes**
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// **Protected Routes (Require Authentication)**
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;