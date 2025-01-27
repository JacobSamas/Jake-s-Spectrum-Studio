const db = require('../config/db');

// Function to create a new color palette
const createPalette = async (name, colors) => {
    try {
        const [result] = await db.query(
            'INSERT INTO palettes (name, colors) VALUES (?, ?)',
            [name, JSON.stringify(colors)]
        );
        return result;
    } catch (err) {
        throw new Error('Error inserting palette: ' + err.message);
    }
};

// Function to get all palettes
const getAllPalettes = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM palettes');
        return rows;
    } catch (err) {
        throw new Error('Error fetching palettes: ' + err.message);
    }
};

// Function to get a palette by ID
const getPaletteById = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM palettes WHERE id = ?', [id]);
        return rows[0];
    } catch (err) {
        throw new Error('Error fetching palette: ' + err.message);
    }
};

// Function to delete a palette
const deletePalette = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM palettes WHERE id = ?', [id]);
        return result;
    } catch (err) {
        throw new Error('Error deleting palette: ' + err.message);
    }
};

// Function to update a color palette by ID
const updatePalette = async (id, name, colors) => {
    try {
        const [result] = await db.query(
            'UPDATE palettes SET name = ?, colors = ? WHERE id = ?',
            [name, JSON.stringify(colors), id]
        );
        return result;
    } catch (err) {
        throw new Error('Error updating palette: ' + err.message);
    }
};

module.exports = {
    createPalette,
    getAllPalettes,
    getPaletteById,
    deletePalette,
    updatePalette
};
