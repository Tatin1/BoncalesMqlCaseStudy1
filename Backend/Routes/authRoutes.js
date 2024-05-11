const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');
const userController = require('../Controller/UserController');

// Authentication routes
router.post('/login', authController.login);
router.post('/signup', authController.signup);

// User routes
router.put('/update/:id', userController.updateUser);

module.exports = router;
