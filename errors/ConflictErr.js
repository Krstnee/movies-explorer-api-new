const { EMAIL_ERR } = require('../utils/constans');

class ConflictErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = EMAIL_ERR;
  }
}

module.exports = ConflictErr;
