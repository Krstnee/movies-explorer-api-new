const BAD_REQ = 400;
const AUTH_ERR = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const EMAIL_ERR = 409;
const DEF_ERR = 500;
const MONGO_URL_DEV = 'mongodb://localhost:27017/moviesdb';
const JWT_SECRET_DEV = 'dev-secret';
const AUTH_ERR_MES = 'Необходимо авторизироваться';
const AUTH_SUCC_MES = 'Вы успешно авторизировались';
const BAD_EMAIL_MES = 'Неверный формат почты';
const BAD_DATA_MES = 'Неправильный пароль или логин';
const CONFLICT_ERR_MES = 'Пользователь с такой почтой уже зарегистрирован';
const FORBIDDEN_ERR_MES = 'Можно удалить только свой фильм';
const VALID_ERR_MES = 'Переданы некорректные данные';
const BAD_URL_MES = 'Неверный формат ссылки';
const NONE_SAVED_FILMS_MES = 'Сохраненные фильмы не найдены';
const FILM_NOT_FOUND = 'Фильм не найден';
const PAGE_NOT_FOUND = 'Страница не найдена';
const USER_NOT_FOUND = 'Пользователь не найден';
const REGEX = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;

module.exports = {
  BAD_REQ,
  AUTH_ERR,
  FORBIDDEN,
  NOT_FOUND,
  EMAIL_ERR,
  DEF_ERR,
  MONGO_URL_DEV,
  JWT_SECRET_DEV,
  AUTH_ERR_MES,
  AUTH_SUCC_MES,
  BAD_EMAIL_MES,
  BAD_DATA_MES,
  CONFLICT_ERR_MES,
  FORBIDDEN_ERR_MES,
  VALID_ERR_MES,
  BAD_URL_MES,
  NONE_SAVED_FILMS_MES,
  FILM_NOT_FOUND,
  PAGE_NOT_FOUND,
  USER_NOT_FOUND,
  REGEX,
};
