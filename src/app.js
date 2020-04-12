const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loggerMiddleware = require('./logger/loggerMiddleware');
const { handleError } = require('./logger/loggerErrorHandler');
const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', loggerMiddleware, (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

process.on('unhandledRejection', (reason, promise) => {
  fs.appendFileSync('./logs/error.log', `\n${reason.stack}` );
  process.exit(1);
});

process.on('uncaughtException', error => {
  fs.appendFileSync('./logs/error.log',  `\n${error.stack}`);
  process.exit(1);
});

app.use((err, req, res,next) => {
  handleError(err, res);
  if(res.statusCode === 500){
    fs.appendFileSync('./logs/error.log',  `\n${err.stack}`);
  }
});

module.exports = app;
