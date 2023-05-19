const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/AuthErr');
const { BAD_EMAIL_MES, BAD_DATA_MES } = require('../utils/constans');

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [{ validator: (value) => validator.isEmail(value), msg: BAD_EMAIL_MES }],
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(BAD_DATA_MES);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(BAD_DATA_MES);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
