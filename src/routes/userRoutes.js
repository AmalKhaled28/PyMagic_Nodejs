const express = require('express')
const router = express.Router()
const {
  registerUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail
} = require('../controllers/userController')

// Create a user
router.post('/register', registerUser)

// Get a user by id
router.get('/:id', getUserById)

// Update a user by id
router.put('/:id', updateUser)

// Delete a user by id
router.delete('/:id', deleteUser)

// Get a user by email
router.get('/email/:email', getUserByEmail)

module.exports = router
