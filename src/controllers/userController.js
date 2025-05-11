const User = require('../models/user');
const StudentQuiz = require('../models/student_quiz');
const Unit = require('../models/unit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// **Register User**
const registerUser = async (req, res) => {
  try {
    const { name, email, password, parentEmail, age } = req.body;
    
    const existingUser = await User.getByEmail(email);
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });

    const existingParentEmail = await User.findOne({ where: { parent_email: parentEmail } });
    if (existingParentEmail) return res.status(400).json({ error: 'Parent email already exists' });

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: 'Password must be at least 10 characters long and include uppercase, lowercase, number, and special character'
      });
    }

    const newUser = await User.create({ name, email, password, parent_email: parentEmail, age, verified: false });

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const verificationLink = `http://localhost:3000/verify-email?token=${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Please verify your email by clicking <a href="${verificationLink}">here</a>.</p>`
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'User created, please verify your email', userId: newUser.id });
  } catch (err) {
    console.error('Error in registerUser:', err);
    res.status(500).json({ error: 'Error creating user: ' + err.message });
  }
};

// **Verify Email**
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) return res.status(400).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    const user = await User.findByPk(decoded.id);
    console.log('User Found:', user);


    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.verified) return res.status(400).json({ error: 'Email already verified' });

    user.verified = true;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (err) {
    console.error('Error in verifyEmail:', err);
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};

// **Login User**
const loginUser = async (req, res) => {
  try {
    const { email, password, rememberMe, parentEmail } = req.body;


    // التحقق من وجود الإيميل والباسوورد في الطلب
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // البحث عن المستخدم باستخدام الإيميل أو إيميل الوالد
    let user;
    try {
      user = await User.getByEmail(email);
      if (!user && parentEmail) {
        user = await User.getByParentEmail(parentEmail);
      }
    } catch (dbError) {
      console.error('Database error in loginUser:', dbError);
      return res.status(500).json({ error: 'Database error while fetching user: ' + dbError.message });
    }

    if (!user) {
      return res.status(200).json({ error: 'Invalid email or password' });
    }

    if (!user.verified) {
      return res.status(200).json({ error: 'Please verify your email first' });
    }

    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) {
      return res.status(200).json({ error: 'Invalid email or password' });
    }

    user.last_login_at = new Date();
    await user.save();

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: rememberMe ? '7d' : '1h',
    });

    // res.cookie('token', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production', // لازم يكون true على Railway لأنه HTTPS
    //   sameSite: 'None', // عشان يسمح بتبادل الكوكيز عبر domains مختلفة
    // });

    //
    res.cookie("token", token, {
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000,
      httpOnly: true,     // Recommended for security
      secure: true,       // HTTPS-only
      sameSite: "None",   // Allow cross-origin
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
        as: 'unit',
        attributes: ['section_id']
      }]
    });

    if (mostRecentQuiz?.Unit?.section_id) {
      lastSectionId = mostRecentQuiz.Unit.section_id;
    }

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        earned_points: user.earned_points,
        lastSectionId: lastSectionId
      },
    });
  } catch (err) {
    console.error('Error in loginUser:', err);
    return res.status(500).json({ error: 'Server error during login: ' + err.message });
  }
};

// **Forgot Password**
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.getByEmail(email);
    if (!user) return res.status(200).json({ error: 'User not found' });

    const resetToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Your Password',
      html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 15 minute.</p>`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (err) {
    console.error('Error in forgotPassword:', err);
    res.status(500).json({ error: 'Error sending reset link: ' + err.message });
  }
};

// **Reset Password**
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token and new password are required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) return res.status(404).json({ error: 'User not found' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Error in resetPassword:', err);
    if (err.name === 'TokenExpiredError') {
      return res.status(400).json({ error: 'Reset token has expired' });
    }
    res.status(400).json({ error: 'Invalid reset token' });
  }
};

// **Get User Profile**
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    res.json(user);
  } catch (err) {
    console.error('Error in getUserProfile:', err);
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// **Get User Profile Page**
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
    console.error('Error in getUserProfilePage:', err);
    res.status(500).json({ error: "Error fetching user profile" });
  }
};

// **Get User Profile Info**
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
  } catch (err) {
    console.error('Error in getUserProfileInfo:', err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// **Update User Profile**
const updateUserProfile = async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword, parentEmail } = req.body;
    const user = await User.findByPk(req.user.id);
    
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (name) user.name = name;
    if (email) user.email = email;
    if (parentEmail) user.parent_email = parentEmail;
    
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
    console.error('Error in updateUserProfile:', err);
    res.status(500).json({ error: 'Error updating profile', details: err.message });
  }
};

// **Update User Points**
const updateUserPoints = async (req, res) => {
  try {
    const { userId, points } = req.body;

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
    console.error('Error in updateUserPoints:', err);
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
  updateUserPoints,
  verifyEmail
};