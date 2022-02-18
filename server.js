//imports
const express = require('express');
const db = require('./db/db.json');
const path = require('path');
const fs = require('fs');



let noteArray = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

//server instantiation
const app = express();

//PORT variable for local and Heroku use
const PORT = process.env.PORT || 3000;

//static link to public assets
app.use(express.static('public'));

//data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get('/api/notes', (req, res) => {
    res.json(db);
});
app.post('/api/notes', (req, res) => {
    let note = req.body;
    let arrayLength = (noteArray.length).toString();
    note.id = arrayLength;
    noteArray.push(note);
    fs.writeFileSync('./db/db.json', JSON.stringify(noteArray));
    res.json(noteArray);
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});






//set app to listen at this port


app.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}/`);
})
