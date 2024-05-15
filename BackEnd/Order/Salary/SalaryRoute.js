const express = require('express');
const router = express.Router();
const UserController = require('./SalaryController');

// GET all users
router.get('/', UserController.getAllUsers);

// GET user by ID
router.get('/:id', UserController.getUserById);

// POST create user
router.post('/', UserController.createUser);

// PUT update user by ID
router.put('/:id', UserController.updateUser);

// DELETE delete user by ID
router.delete('/:id', UserController.deleteUser);

module.exports = router;
