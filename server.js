'use strict';

// ******* REQUIRES *********
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { response } = require('express');
const axios = require('axios');

const getWeather = require('./getWeather');
const getMovies = require('./getMovies');

// ******* CONSTANTS *********
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

// ***** WEATHER ENDPOINT *****
app.get('/weather', getWeather);
// ***MOVIE END POINT ***
app.get('/movies', getMovies);



// let { searchquery } = request.query
// let dataToGroom = data.find(city => city.city_name == searchquery);
// let weatherData = dataToGroom.data.map(day => new Forecast(day))
// FOR THE LAB 
// TODO: ACCEPT THE QUERIES
// TODO: USE THOSE QUERIES AND BUILD OUT AN URL TO HIT THE API
// TODO:GROOM THAT DATA
// TODO: SEND THAT DATA TO THE FRONT END
// ******** CLASS TO GROOM BULKY DATA ***********




// ***** CATCH ALL ENDPOINT - NEEDS TO BE YOUR LAST DEFINED ENDPOINT ********

// *** ERROR HANDLING ****
app.get('*', (request, response) => {
  response.status(404).send('This page does not exist');
});


app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// ********* START MY SERVER *****************
app.listen(PORT, () => console.log(`We are runnin on port: ${PORT}`));