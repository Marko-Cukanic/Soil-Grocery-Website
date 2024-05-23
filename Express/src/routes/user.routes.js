const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Get all users
router.get('/', userController.all);

// Get a single user by ID
router.get('/:id', userController.one);

// Login a user
router.post('/login', userController.login);

// Create a new user
router.post('/', userController.create);

module.exports = router;
