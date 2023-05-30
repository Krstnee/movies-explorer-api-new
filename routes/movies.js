const router = require('express').Router();

const {
  createMovie,
  deleteMovie,
  getMovies,
} = require('../controllers/movie');

const { movieDeleteValidator, createMovieValidator } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', createMovieValidator, createMovie);
router.delete('/:movieId', movieDeleteValidator, deleteMovie);

module.exports = router;
