var express = require('express');
var app = express();
var db = require('../database');
const bodyParser = require('body-parser');
const request = require('request');


let apiKey = process.env.MY_API_KEY;
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('/views/index', {weather: null, error: null, temp: null, playlist: null});
})


app.post('/views/index', function (req, res, ) {
 // request.assert('city', 'city is required').notEmpty();
  //city: request.sanitize('city').escape().trim(),

  let city = req.body.city;
  console.log(city);
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  

  request(url, function (err, response, body ) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again', temp: null, playlist: null});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('./views/index', {weather: null, error: 'Error, please try again', temp: null, playlist: null});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        let temp = `${weather.main.temp}`;
        conversion(temp); //not used rn 
        playlistURL = "5dN1bcsHyvBhViD2ANdYn9"; //for testing
        res.render('./views/index', {weather: weatherText, error: null, temp: temp, playlist: playlistURL});
      }
    }
  });
})

function conversion(temp) {
  if(temp>70){
    console.log('hot')
  } else {
    console.log('cold')
  }
}

module.exports = app;