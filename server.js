//imports
const express = require('express');
const { db } = require('./db/db');
const path = require('path');
const fs = require('fs');

//server instatiation
const app = express();

//PORT variable for local and Heroku use
const PORT = process.env.PORT || 3000;

//static link to public assets
app.use(express.static('public'));

//data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.post('/api/notes', (req, res) => {
    let note = req.body;
    let noteArray = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let arrayLength = (noteArray.length).toString();
    note.id = arrayLength;
    noteArray.push(note);
    fs.writeFileSync('./db/db.json', JSON.stringify(noteArray));
    res.json(noteArray);
});


app.get('/api/db', (req, res) => {
    res.send('IF YOU SEE THIS, YOUR SERVER AND ROUTE WORKS!')
    // res.json(db);
})
//route for index



//set app to listen at this port


app.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}/`);
})
