'use strict';

// ******* REQUIRES *********
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { response } = require('express');
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


// ****** ENDPOINTS ***********




// ************* BASE ENDPOINTS ************* ----PROOF OF LIFE 
// ** 1st arguement - endpoint in quotes
// ** 2nd arguement - callback which will execute when someone hits that point
// ** callback function - 2 parameters: request, response (req,res)

app.get('/', (request, response) => {
  response.status(200).send('Welcome to the server');
});


app.get('/weather', (request, response, next) => {
  let lat = request.query.lat;
  let lon = request.query.lon;
  let searchquery  = request.query.city_name
  let dataToGroom = data.find(city => city.city_name == searchquery);

  try {

    let weatherData = dataToGroom.data.map(day => new Forecast(day, lat, lon))

    response.status(200).send(weatherData);
console.log(weatherData);

  } catch (error) {
    next(error);
  }
});
// ******** CLASS TO GROOM BULKY DATA ***********
class Forecast {
  constructor(dayObj, lat, lon) {
    this.date = dayObj.valid_date
    this.description = dayObj.weather.description
    this.lat = lat 
    this.lon = lon 
  }
}





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