const BAD_REQ = require('../utils/constans');

class BadReqErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQ;
  }
}

module.exports = BadReqErr;
