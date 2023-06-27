const mongoose = require('mongoose');
const validator = require('validator');
const BAD_EMAIL_MES = require('../utils/constans');

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

module.exports = mongoose.model('user', userSchema);
