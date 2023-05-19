const NOT_FOUND = require('../utils/constans');

class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

module.exports = NotFoundErr;
