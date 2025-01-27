const express = require('express');
const dotenv = require('dotenv');
const db = require('./src/config/db');
const paletteModel = require('./src/models/paletteModel');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;  

app.use(express.json());  // Middleware to parse JSON requests

// Route to add a new palette
app.post('/palettes', async (req, res) => {
    const { name, colors } = req.body;
    try {
        const result = await paletteModel.createPalette(name, colors);
        res.status(201).json({ message: 'Palette added', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to get all palettes
app.get('/palettes', async (req, res) => {
    try {
        const palettes = await paletteModel.getAllPalettes();
        res.json(palettes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to get a palette by ID
app.get('/palettes/:id', async (req, res) => {
    try {
        const palette = await paletteModel.getPaletteById(req.params.id);
        if (palette) {
            res.json(palette);
        } else {
            res.status(404).json({ message: 'Palette not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to delete a palette by ID
app.delete('/palettes/:id', async (req, res) => {
    try {
        await paletteModel.deletePalette(req.params.id);
        res.json({ message: 'Palette deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

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
