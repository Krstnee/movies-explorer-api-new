const AUTH_ERR = require('../utils/constans');

class AuthErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTH_ERR;
  }
}

module.exports = AuthErr;
