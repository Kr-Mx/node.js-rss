const router = require('express').Router();
const { ErrorHandler } = require('../logger/loggerErrorHandler');
const { getUserLogin } = require('../resources/users/user.service');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');

router.route('/').all(async (req, res, next) => {
  if (req.method !== 'POST') {
    return next(new ErrorHandler(405, `Method ${req.method} not allowed for you`));
  }
  const user = await getUserLogin(req.body);
  if (Object.keys(user).length) {
    const token = jwt.sign(
      { userId: user._id, login: user.login },
      JWT_SECRET_KEY
    );
    res.send({ token });
  }
  return next(new ErrorHandler(403, 'Forbidden for you'));
});

module.exports = router;
