const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./src/config/db');
const paletteModel = require('./src/models/paletteModel');
const userRoutes = require('./src/routes/userRoutes');
const errorHandler = require('./src/middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;  

app.use(cors());

app.use(errorHandler);

app.use(express.json());  

app.use('/users', userRoutes);

// Route to add a new palette
app.post('/palettes', async (req, res) => {
    const { name, colors } = req.body;
  
    if (!name || !colors) {
      return res.status(400).json({ error: 'Name and colors are required' });
    }
  
    try {
      const result = await db.query('INSERT INTO palettes (name, colors) VALUES (?, ?)', [
        name,
        colors,
      ]);
      res.status(201).json({ message: 'Palette added successfully', id: result.insertId });
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

// Route to update a palette by ID
app.put('/palettes/:id', async (req, res) => {
    const { id } = req.params;
    const { name, colors } = req.body;

    if (!name || !colors) {
        return res.status(400).json({ error: 'Name and colors are required' });
    }

    try {
        const result = await paletteModel.updatePalette(id, name, colors);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Palette not found' });
        }
        res.json({ message: 'Palette updated successfully' });
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
