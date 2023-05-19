const Movie = require('../models/movie');

const {
  FILM_NOT_FOUND,
  VALID_ERR_MES,
  FORBIDDEN_ERR_MES,
} = require('../utils/constans');

const BadReqErr = require('../errors/BadReqError');
const NotFoundErr = require('../errors/NotFoundErr');
const ForbidErr = require('../errors/ForbidErr');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user.id;
  Movie.find({ owner: userId })
    .then((movie) => res.send(movie))
    .catch(next);
};

function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user.id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadReqErr(VALID_ERR_MES));
      } else {
        next(err);
      }
    });
}

module.exports.deleteMovie = (req, res, next) => {
  const userId = req.user.id;
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((async (movie) => {
      if (!movie) {
        next(new NotFoundErr(FILM_NOT_FOUND));
      } if (userId.toString() === movie.owner.toString()) {
        await Movie.deleteOne(movie);
        res.send(movie);
      }
      next(new ForbidErr(FORBIDDEN_ERR_MES));
    }))
    .catch((err) => {
      if (err.name === 'ReferenceError') {
        next(new BadReqErr(VALID_ERR_MES));
      } else {
        next(err);
      }
    });
};
module.exports = { createMovie };
