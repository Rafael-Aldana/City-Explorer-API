const axios = require('axios');

async function getWeather (request, response, next) {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;

    let url = `http:api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=7&units=imperial`;
    let weatherFromAxios = await axios.get(url);
    let weatherData = weatherFromAxios.data.data.map(day => new Forecast(day));

    response.status(200).send(weatherData);
    console.log(weatherData);

  } catch (error) {
    next(error);
  }
};

class Forecast {
  constructor(dayObj) {
    this.date = dayObj.valid_date;
    this.description = dayObj.weather.description;
  }
};

module.exports = getWeather;