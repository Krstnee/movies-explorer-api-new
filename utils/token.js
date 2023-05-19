const { JWT_SECRET_DEV } = require('./constans');

const { NODE_ENV, JWT_SECRET } = process.env;

function getJwtToken() {
  if (NODE_ENV === 'production') {
    if (!JWT_SECRET) {
      throw new Error('JWT-токен не найден');
    }
    return JWT_SECRET;
  }
  return JWT_SECRET_DEV;
}

module.exports = getJwtToken;
