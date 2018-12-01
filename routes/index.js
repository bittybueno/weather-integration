var express = require('express');
var app = express();

let apiKey = process.env.MY_API_KEY;

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null, temp: null, playlist: null});
})


app.post('/', function (req, res, ) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  

  request(url, function (err, response, body ) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again', temp: null, playlist: null});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again', temp: null, playlist: null});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        let temp = `${weather.main.temp}`;
        console.log(temp);
        conversion(temp);
        playlistURL = "5dN1bcsHyvBhViD2ANdYn9";
        res.render('index', {weather: weatherText, error: null, temp: temp, playlist: playlistURL});
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