const router = require('express').Router();

const { updateInfoUserValidator } = require('../middlewares/validation');

const {
  getUser,
  updateUser,
} = require('../controllers/user');

router.get('/me', getUser);
router.patch('/me', updateInfoUserValidator, updateUser);

module.exports = router;
