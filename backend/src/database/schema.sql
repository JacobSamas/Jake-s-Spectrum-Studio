-- Create the color palettes table
CREATE TABLE IF NOT EXISTS palettes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    colors TEXT NOT NULL, -- Store color codes as JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create users table (optional, for authentication later)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
