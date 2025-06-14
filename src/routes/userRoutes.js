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
  getUserProfileInfo,
  updateUserProfile,
  updateUserPoints,
  verifyEmail
} = UserController; 


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/verify-email', verifyEmail);

//test
router.get('/profile', authMiddleware, getUserProfile);

router.get('/profile/:userId', authMiddleware,getUserProfileInfo);

router.put('/Editprofile', authMiddleware, updateUserProfile);

router.post('/update-points', authMiddleware, updateUserPoints);




module.exports = router;