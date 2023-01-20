'use strict';

// ******* REQUIRES *********
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { response } = require('express');
import axios from "axios";

//  ***** DON'T FORGET TO REQUIRE YOUR START JSON FILE ******
let data = require('./data/weather.json');

// ********* ONCE EXPRESS IS IN WE NEED TO USE IT - PER DOCS
// * APP === OURSERVER *
const app = express();
// ************ DEFINE MIDDLEWARE **********
// CORS IS MIDDLEWARE- SECURITY GUARD THAT ALLOWS US TO SHARE RESOURCES ACROSS THE INTERNET
app.use(cors());



// ******** DEFINE A PORT FOR MY SERVER TO RUN ON *************
const PORT = process.env.PORT || 3002;


// ****** ENDPOINTS *********
// ************* BASE ENDPOINTS ************* ----PROOF OF LIFE 
// ** 1st arguement - endpoint in quotes
// ** 2nd arguement - callback which will execute when someone hits that point
// ** callback function - 2 parameters: request, response (req,res)

app.get('/', (request, response) => {
  response.status(200).send('Welcome to the server');
});

app.get('/weather', async (request, response, next) => {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    // let { searchquery } = request.query
    // let dataToGroom = data.find(city => city.city_name == searchquery);
    // let weatherData = dataToGroom.data.map(day => new Forecast(day))


    let url = `http:api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=7&units=imperial`;
    let weatherFromAxios = await axios.get(url);
    let weatherData = weatherFromAxios.data.data.map(day => new Forecast(day));

    response.status(200).send(weatherData);
    console.log(weatherData);

  } catch (error) {
    next(error);
  }
});




// ***MOVIE END POINT ***
app.get('/movies', async (request, response, next) => {
  try {
    let queryFromFrontEnd = request.query.searchQuery;

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${queryFromFrontEnd}&language=en-US&page=1&include_adult=false`;
    let moviesFromAxios = await axios.get(url);
    let moviesData = moviesFromAxios.data.results.map(movie => new Movie(movie));
    // let groomedData = photoResults.data.results.map(picObj => new Photo(picObj));

    response.status(200).send(moviesData);
  } catch (error) {

  }
})
// FOR THE LAB 
// TODO: ACCEPT THE QUERIES
// TODO: USE THOSE QUERIES AND BUILD OUT AN URL TO HIT THE API
// TODO:GROOM THAT DATA
// TODO: SEND THAT DATA TO THE FRONT END
// ******** CLASS TO GROOM BULKY DATA ***********

class Forecast {
  constructor(dayObj) {
    this.date = dayObj.valid_date;
    this.description = dayObj.weather.description;
  }
};
class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
  }
};


// ***** CATCH ALL ENDPOINT - NEEDS TO BE YOUR LAST DEFINED ENDPOINT ********

app.get('*', (request, response) => {
  response.status(404).send('This page does not exist');
});

// *** ERROR HANDLING ****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// ********* START MY SERVER *****************
app.listen(PORT, () => console.log(`We are runnin on port: ${PORT}`));