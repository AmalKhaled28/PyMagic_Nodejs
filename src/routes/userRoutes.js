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
  updateUserProfile
} = UserController; // Destructure the required methods from UserController

//Protected Routes (Require Authentication)**

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// **Protected Routes (Require Authentication)**
router.get('/profile', authMiddleware, getUserProfile);
//profile page 
router.get('/profile/:userId', authMiddleware,getUserProfileInfo);
// edit user info 

router.put('/Editprofile', authMiddleware, updateUserProfile);



module.exports = router;