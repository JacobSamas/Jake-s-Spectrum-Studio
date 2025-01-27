const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Function to register a new user
const registerUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const [result] = await db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        return result;
    } catch (err) {
        throw new Error('Error registering user: ' + err.message);
    }
};

// Function to find a user by email
const findUserByEmail = async (email) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    } catch (err) {
        throw new Error('Error finding user: ' + err.message);
    }
};

module.exports = {
    registerUser,
    findUserByEmail
};
