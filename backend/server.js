const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;  

app.get('/', (req, res) => {
    res.send('Welcome to Jake\'s Spectrum Studio Backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
