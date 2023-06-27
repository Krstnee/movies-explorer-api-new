const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const corsOp = require('./middlewares/cors');
const router = require('./routes/index');
const handleError = require('./middlewares/errorHandle');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');

const { MONGO_URL_DEV } = require('./utils/constans');

require('dotenv').config();

const { PORT = 3000, MONGO_URL = MONGO_URL_DEV } = process.env;

const app = express();
app.use(corsOp);

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log('Connected to moviesdb');

  await app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}
app.use(helmet());
app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  console.error(err);
  handleError(err, res, next);
});
main();
