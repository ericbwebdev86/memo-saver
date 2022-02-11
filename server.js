//imports
const express = require('express');
const { db } = require('./db/db');
const path = require('path');

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
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
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
