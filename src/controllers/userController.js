const User = require('../models/user')

// Create a user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, parentEmail, age } = req.body
    const newUser = await User.create({ name, email, password, parentEmail, age })
    res.status(201).json({ message: 'User created', userId: newUser.userId })
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' })
  }
}

// Find a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving user' })
  }
}

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { userId: req.params.id }
    })
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id)
      return res.json(updatedUser)
    }
    res.status(404).json({ error: 'User not found' })
  } catch (err) {
    res.status(500).json({ error: 'Error updating user' })
  }
}

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { userId: req.params.id }
    })
    if (deleted) return res.json({ message: 'User deleted' })
    res.status(404).json({ error: 'User not found' })
  } catch (err) {
    res.status(500).json({ error: 'Error deleting user' })
  }
}

const getUserByEmail = async (req, res) => {
    try {
      const { email } = req.params
      const user = await User.getByEmail(email)
      if (!user) return res.status(404).json({ error: 'User not found' })
      res.json(user)
    } catch (err) {
      res.status(500).json({ error: 'Error retrieving user' })
    }
}

const getUserEarnedPoints = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    console.log("Earned Points:", user.earned_points); // Debugging
    console.log("User:", user); // Debugging


    res.json({ earned_points: user.earned_points });

  } catch (err) {
    res.status(500).json({ error: 'Error retrieving user' });
  }
};

module.exports = {
  registerUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
  getUserEarnedPoints
}
