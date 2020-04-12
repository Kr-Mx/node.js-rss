const logger = require('./logger');

const loggerMiddleware = (req, res, next) => {
  logger.info(
    `url: ${req.url}, body: ${JSON.stringify(
      req.body
    )}, parameters: ${JSON.stringify(req.query)}`
  );
  next();
};

module.exports = loggerMiddleware;
