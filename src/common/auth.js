const { ErrorHandler } = require('../logger/loggerErrorHandler');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

module.exports = (req, res, next) => {
  const {
    headers: { authorization }
  } = req;
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    try {
      jwt.verify(authorization.split(' ')[1], JWT_SECRET_KEY);
      return next();
    } catch (err) {
      return next(err);
    }
  }
  return next(new ErrorHandler(401, 'Unauthorized'));
};
