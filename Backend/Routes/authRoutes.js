const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hardcoded admin credentials (normally, you should never hardcode sensitive information like this in your code!)
const adminUser = {
    username: 'admin',
    password: '0000'
};

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if the submitted username matches the hardcoded admin username
    if (username !== adminUser.username) {
        return res.status(404).json({ message: "User not found" });
    }

    try {
        // Compare the submitted password with the hashed admin password using bcrypt
        const isMatch = await bcrypt.compare(password, adminUser.password);

        // If the password doesn't match, return an error response
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JSON Web Token (JWT) upon successful authentication
        const token = jwt.sign({ username: adminUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Respond with the generated JWT
        res.json({ token });
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
