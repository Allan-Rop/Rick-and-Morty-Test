import mysql from 'mysql';

// Create connection to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Scola254!@#',
    database: 'rickandmorty'
});
// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + db.threadId);
});

// Define API route handler
export default function handler(req, res) {
    if (req.method === 'POST') {
        const { comment, character } = req.body;

        try {
            // Insert comment and character details into MySQL database
            const sql = 'INSERT INTO comments (comment, character_name, status, species, origin, gender, location, episodes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [
                comment,
                character.name,
                character.status,
                character.species,
                character.origin ? character.origin.name : null,
                character.gender,
                character.location ? character.location.name : null,
                character.episode.length
            ];

            db.query(sql, values, (err, result) => {
                if (err) {
                    console.error('Error inserting comment into MySQL: ' + err.stack);
                    res.status(500).json({ error: 'Error inserting comment into MySQL' });
                    return;
                }

                console.log('Comment inserted into MySQL with ID ' + result.insertId);
                res.status(200).json({ message: 'Comment submitted successfully' });
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // Return 405 Method Not Allowed for non-POST requests
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}