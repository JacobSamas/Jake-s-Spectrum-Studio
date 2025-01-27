const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route to get user profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await userModel.findUserByEmail(req.user.email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            created_at: user.created_at
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// User Registration (Signup)
router.post(
    '/signup',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('email').isEmail().withMessage('Enter a valid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        try {
            const existingUser = await userModel.findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }

            await userModel.registerUser(username, email, password);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);

// User Login
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Enter a valid email'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await userModel.findUserByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ token });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);

module.exports = router;
