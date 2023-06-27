function errorHandle(err, res, next) {
  const { message } = err;
  res.status(500).send({ message });
  next();
}

module.exports = errorHandle;
