const { createLogger, format, transports } = require('winston');
const logger = createLogger({
  transports: [
    new transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: format.printf(
        info =>
          `${info.message}`
      )
    }),
    new transports.File({
      filename: './logs/info.log',
      level: 'info',
      format: format.printf(
        info =>
          `${info.message}`
      )
    })
  ]
});

module.exports = logger;
