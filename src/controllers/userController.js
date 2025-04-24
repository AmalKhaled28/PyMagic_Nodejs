
//controllers/userController.js
const User = require('../models/user');
const StudentQuiz = require('../models/student_quiz');
const Unit = require('../models/unit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

// **Register User**
const registerUser = async (req, res) => {
  try {
    const { name, email, password, parentEmail, age } = req.body;
    
    const existingUser = await User.getByEmail(email);
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });

    const newUser = await User.create({ name, email, password, parent_email: parentEmail, age });

    res.status(201).json({ message: 'User created', userId: newUser.id });
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

// **Login User**
const loginUser = async (req, res) => {
  try {

    const { email, password, rememberMe } = req.body;

    const user = await User.getByEmail(email) || await User.getByEmail(req.body.parentEmail);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

    // Update `last_login_at` with the current date
    user.last_login_at = new Date();
    await user.save(); // Save changes to the database

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: rememberMe ? '7d' : '1h',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      sameSite: 'Strict',
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000, // بالمللي ثانية
    });
    
    let lastSectionId = 1;
    const mostRecentQuiz = await StudentQuiz.findOne({
      where: {
        user_id: user.id,
        is_passed: true
      },
      order: [['created_at', 'DESC']],
      include: [{
        model: Unit,
        as : 'unit',
        attributes: ['section_id']
      }]
    });

    if (mostRecentQuiz?.Unit?.section_id) {
      lastSectionId = mostRecentQuiz.Unit.section_id;
    }

    // Include user details in the response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        earned_points: user.earned_points,
        lastSectionId: lastSectionId
        //add more static user data as needed
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in ' + err });
  }
};


// **Forgot Password**
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.getByEmail(email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    //return forget password link 
    res.json({ message: 'Password reset link sent' });
  } catch (err) {
    res.status(500).json({ error: 'Error processing request' });
  }
};


// **Reset Password**
const resetPassword = async (req, res) => {
  try {
    const { email, password, resetToken } = req.body;
    const user = await User.getByEmail(email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    //check password and update it 
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ error: 'Error processing request' });
  }
};

////
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

const getUserProfilePage = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Achievement,
          include: [
            {
              model: Reward,
              attributes: ["text", "image"],
            },
          ],
        },
      ],
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    // Transform achievements data
    const achievements = user.Achievements.map((achievement) => ({
      title: achievement.Reward.text,
      description: `Unlocked on ${achievement.created_at}`,
    }));

    res.json({
      name: user.name,
      earned_points: user.earned_points,
      achievements,
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching user profile" });
  }
};

const getUserProfileInfo = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      user: {
        name: user.name,
        points: user.earned_points || 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}



const updateUserProfile = async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword, parentEmail } = req.body;
    const user = await User.findByPk(req.user.id);
    
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Update basic fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (parentEmail) user.parent_email = parentEmail;
    
    // Handle password change
    if (currentPassword && newPassword) {
      const isPasswordValid = await user.checkPassword(currentPassword);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    res.status(200).json({ 
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        parent_email: user.parent_email,
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Error updating profile', details: err.message });
  }
};

// **Update User Points**
// const updateUserPoints = async (req, res) => {
//   try {
//     const { userId, points } = req.body;


//   // التحقق من أن المستخدم المسجل هو نفسه صاحب الطلب
//   if (req.user.id !== parseInt(userId)) {
//     return res.status(403).json({ error: 'Unauthorized' });
//   }



//     const user = await User.findByPk(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     user.earned_points = (user.earned_points || 0) + points;
//     await user.save();

//     res.status(200).json({ message: 'Points updated successfully', earned_points: user.earned_points });
//   } catch (err) {
//     res.status(500).json({ error: 'Error updating points', details: err.message });
//   }
// };

const updateUserPoints = async (req, res) => {
  try {
    const { userId, points } = req.body;

    // تحقق إضافي للنقاط
    if (!Number.isInteger(points) || points < 0) {
      return res.status(400).json({ error: "Points must be a positive integer" });
    }

    if (req.user.id !== parseInt(userId)) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.earned_points = (user.earned_points || 0) + points;
    await user.save();

    res.status(200).json({ message: "Points updated successfully", earned_points: user.earned_points });
  } catch (err) {
    res.status(500).json({ error: "Error updating points", details: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  getUserProfilePage,
  getUserProfileInfo,
  updateUserProfile,
  updateUserPoints
};
