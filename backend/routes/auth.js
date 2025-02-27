const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

// Signup endpoint
router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = await User.create({ email, password });

        // Generate token after signup
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ 
            message: 'User created successfully!',
            user: { id: newUser.id, email: newUser.email },
            token,
        });
    } catch (error) {
        console.error('Signup error ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        //Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('Login error: ', error);
        res.status(500).json({ message: ' Internal server error' });
    }
});

// Logout endpoint
router.post('/logout', (req, res) => {
    res.json({ message: 'Logout successful. Remove the user token from your client' });
});

module.exports = router;