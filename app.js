//express package
const express = require('express')
    //Installing mongoose to connect to database
const mongoose = require('mongoose');
//Declaring bodyparser to fetch and convert information from html form
const bodyParser = require('body-parser');

const path = require('path');

const app = express();

//Creating a connection to database 
mongoose.connect( //CAUTION: i used boi-db as my local database. Needs to change to ATLAS
    "mongodb://localhost:27017/boi-db", { useNewUrlParser: true, useUnifiedTopology: true },
    function(err) {
        if (err) throw err;
        console.log("Successfully connected");
    }
);



app.get('/', (req, res) => {
    res.send("Hello JSON!")
})

//for local development testing onlys
app.listen(3000, () => {
    console.log(`Server listening on port http://localhost:${3000}`);
})