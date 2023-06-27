const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthErr');
const { getJwtToken } = require('../utils/token');
const { AUTH_ERR_MES } = require('../utils/constans');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError(AUTH_ERR_MES));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, getJwtToken());
  } catch (err) {
    next(new AuthError(AUTH_ERR_MES));
  }
  req.user = payload;
  return next();
};
