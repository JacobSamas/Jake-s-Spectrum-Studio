const express = require('express');
const dotenv = require('dotenv');
const db = require('./src/config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;  

app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        res.send(`Database Connected Successfully! Test Result: ${rows[0].result}`);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Database connection failed');
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to Jake\'s Spectrum Studio Backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
