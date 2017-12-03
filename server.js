// Create Express instance
var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
// Add Body-Parser to parse post parameters
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Create Database
var sqlite3 = require('sqlite3').verbose();
var path = require('path');
var dbPath = path.resolve(__dirname, 'pets.db') // Get DB path
var db = new sqlite3.Database(dbPath)           // Create database if not exists 

require("./petserver/app.js")(app,db);

// Start listening 
app.listen(process.env.PORT || 3000, function () {
    console.log('App listening on port ' + (process.env.PORT || 3000));
});