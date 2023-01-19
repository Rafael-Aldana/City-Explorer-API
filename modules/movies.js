const axios = require('axios');

async function getMovies(request, response, next) {
  try {
    let queryFromFrontEnd = request.query.searchQuery;

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${queryFromFrontEnd}&language=en-US&page=1&include_adult=false`;
    let moviesFromAxios = await axios.get(url);
    let moviesData = moviesFromAxios.data.results.map(movie => new Movie(movie));
    // let groomedData = photoResults.data.results.map(picObj => new Photo(picObj));

    response.status(200).send(moviesData);
  } catch (error) {

  }
};

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
  }
};

module.exports = getMovies;