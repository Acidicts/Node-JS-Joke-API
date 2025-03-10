const express = require('express');
const { METHODS } = require('http');
const { userInfo } = require('os');
const path = require('path');
const { env } = require('process');
const sqlite3 = require('sqlite3').verbose();

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {

    if (err) {

        return console.error(err.message);
    }

    console.log('Connected to the SQLite database.');
});

db.serialize(() => {

    db.run(`CREATE TABLE IF NOT EXISTS jokes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        joke TEXT NOT NULL
    )`);

});

app.use(express.static(path.join(__dirname, 'pub')));

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'pub', 'index.html'));

});

app.post('/add' , (req, res) => {

    const joke = req.query.joke;

    if (!joke) {

        return res.status(400).send('Joke is required');

    }
    
    db.run("INSERT INTO jokes (joke) VALUES (?)", [joke], function(err) {

        if (err) {
            console.error(err.message);

            return res.status(500).send(err.message);
        }
        
        res.status(201).send({ id: this.lastID, joke });
    });

    console.log('Joke added');
});

app.get('/jokes', (req, res) => {

    db.all("SELECT * FROM jokes", [], (err, rows) => {

        if (err) {

            console.error(err.message);

            return res.status(500).send(err.message);
        }

        let table = '<table border="1"><tr><th>ID</th><th>Joke</th></tr>';

        rows.forEach((row) => {

            table += `<tr><td>${row.id}</td><td>${row.joke}</td></tr>`;
        
        });

        table += '</table>';
        
        res.send(table);

    });

});

app.delete('/reset', (req, res) => {

    user = req.query.user;
    
    pwd = req.query.pwd;

    if (user != env.user || pwd != env.pwd) {
    
        return res.status(401).send('Unauthorized');
    
    }

    db.run("DELETE FROM jokes", function(err) {
        
        if (err) {
            
            console.error(err.message);
            
            return res.status(500).send(err.message);

        }

        res.status(204).send();
    
    });

});

app.delete('/delete/:id', (req, res) => {

    const id = req.params.id;

    if (!id) {

        return res.status(400).send('ID is required');
    }

    db.run("DELETE FROM jokes WHERE id = ?", [id], function(err) {

        if (err) {

            console.error(err.message);

            return res.status(500).send(err.message);

        }

        res.status(204).send();

    });

    console.log('Joke deleted');

});

app.get("/random", (req, res) => {
    db.all("SELECT * FROM jokes", [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }
        const randomIndex = Math.floor(Math.random() * rows.length);
        res.send(rows[randomIndex].joke);
    });
});

app.get("/joke/:id", (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send('ID is required');
    }
    db.get("SELECT * FROM jokes WHERE id = ?", [id], (err, row) => {

        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }

        if (!row) {
            return res.status(404).send('Joke not found');
        }

        res.send(row.joke);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
