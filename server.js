const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()


require('dotenv').load();
var expressValidator = require('express-validator');
app.use(expressValidator());

var methodOverride = require('method-override');
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method
    }
}));

var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser('csci3308'));
app.use(session({
    secret: 'csci3308',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));
app.use(flash());

let apiKey = process.env.MY_API_KEY;

app.use(express.static('public'));
var index = require('./routes/index');
app.use('/', index);


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})