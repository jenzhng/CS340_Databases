/* 
CS340 Project Group 146
Arberim Ame
Jenny Zhong

app.js
    This file is the main entry point for the application.
    It sets up the server and routes.

Citation: 
    DATE: 02/28/2024
    This code is adopted from the CS340 Node.js starter guide.
    URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// SETUP
var express = require('express');
var app = express();
PORT = 3247;

var db = require('./database/db-connector');

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({ extname: '.hbs' })); 
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'));


// ROUTES
const customersRoute = require('./routes/customers');
const ordersRoute = require('./routes/orders');
const recordsRoute = require('./routes/records');
const genresRoute = require('./routes/genres');
const recordordersRoute = require('./routes/recordorders');
const genrerecordsRoute = require('./routes/genrerecords');
app.use('/', customersRoute);
app.use('/', ordersRoute);
app.use('/', recordsRoute);
app.use('/', genresRoute);
app.use('/', recordordersRoute);
app.use('/', genrerecordsRoute);

app.get('/', function(req, res) {
    res.render('index');

});


// LISTENER
app.listen(PORT, function() {
    console.log('Listening on port ' + PORT + '; press Ctrl-C to terminate.');
});