const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  createUser,
  login,
} = require('../controllers/user');

const {
  createUserValidator,
  loginValidator,
} = require('../middlewares/validation');

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundErr');
const { PAGE_NOT_FOUND } = require('../utils/constans');

router.post('/signup', createUserValidator, createUser);
router.post('/signin', loginValidator, login);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND));
});

module.exports = router;
