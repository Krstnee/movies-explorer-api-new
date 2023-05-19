const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundErr');
const AuthErr = require('../errors/AuthErr');
const ConflictError = require('../errors/ConflictErr');
const BadReqErr = require('../errors/BadReqError');
const {
  CONFLICT_ERR_MES,
  VALID_ERR_MES,
  AUTH_SUCC_MES,
  USER_NOT_FOUND,
  BAD_DATA_MES,
  NOT_FOUND,
} = require('../utils/constans');

const salt = 10;
const getJwtToken = require('../utils/token');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(new ConflictError(CONFLICT_ERR_MES));
      }
      bcrypt.hash(password, salt)
        .then((hash) => User.create({
          email,
          password: hash,
          name,
        }))
        .then(() => {
          res.send({ email, name });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadReqErr(VALID_ERR_MES));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        next(new AuthErr(BAD_DATA_MES));
      } else {
        bcrypt.compare(password, salt, (isValid) => {
          if (!isValid) {
            next(new AuthErr(BAD_DATA_MES));
          } else {
            const token = jwt.sign({ _id: user._id }, getJwtToken(), { expiresIn: '7d' });
            res.send({ message: AUTH_SUCC_MES, token });
          }
        });
      }
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(NOT_FOUND));
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user.id, {
    name,
    email,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(NOT_FOUND));
      } if (!name || !email) {
        next(new BadReqErr(VALID_ERR_MES));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_ERR_MES));
      }
      if (err.name === 'ReferenceError') {
        next(new NotFoundError(USER_NOT_FOUND));
      } else {
        next(err);
      }
    });
};
