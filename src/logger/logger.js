const { createLogger, format, transports } = require('winston');
const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "./logs/error.log",
      level: 'error',
      format: format.json()
    }),
    new transports.File({
      filename: "./logs/info.log",
      level: 'info',
      format: format.json()
    })
  ]
});

module.exports = logger;