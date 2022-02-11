//imports
const express = require('express');
const { db } = require('./db/db');

//server instatiation
const app = express();

//PORT variable for local and Heroku use
const PORT = process.env.PORT || 3000;

//routes
app.get('/api/db', (req, res) => {
    res.send('IF YOU SEE THIS, YOUR SERVER AND ROUTE WORKS!')
    res.json(db);
})


//set app to listen at this port


app.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}/`);
})
