// Create a user
// 

/////////////////////////////////////////

const User = require('../models/user');
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

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: rememberMe ? '7d' : '1h' });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in'+err });
  }
};

// **Forgot Password**
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.getByEmail(email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // هنا يمكنك توليد رمز عشوائي أو رابط إعادة تعيين كلمة المرور وإرساله عبر البريد الإلكتروني
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

    // هنا يمكنك التحقق من صحة الرمز المميز وتحديث كلمة المرور
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ error: 'Error processing request' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserProfile
};




