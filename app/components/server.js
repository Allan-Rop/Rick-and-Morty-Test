// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create connection to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Scola254!@#',
    database: 'rickandmorty'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle submitting a comment for a character
app.post('/api/characters/:characterId/comments', (req, res) => {
    const { characterId } = req.params;
    const { comment } = req.body;

    // Insert comment into MySQL database
    const sql = 'INSERT INTO comments (character_id, comment) VALUES (?, ?)';
    db.query(sql, [characterId, comment], (err, result) => {
        if (err) {
            console.error('Error inserting comment:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log('Comment inserted successfully');
        res.status(201).json({ message: 'Comment submitted successfully' });
    });
});

// More routes for other CRUD operations...

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});