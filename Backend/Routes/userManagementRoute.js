const express = require('express');
const router = express.Router();
const User = require('../Models/User'); // Adjust the path to match your model location

// Fetch all Users
router.get('/Users', async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all users from the database
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new User
router.post('/Users', async (req, res) => {
    const { name, email, password, role, specialization, degree, yearOfExperience } = req.body;
    
    // Create a new instance of User model with provided data
    const newUser = new User({
        name,
        email,
        password,
        role,
        specialization,
        degree,
        yearOfExperience
    });

    try {
        const savedUser = await newUser.save(); // Save the new user to the database
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
