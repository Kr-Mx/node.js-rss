const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const { ErrorHandler, handleError } = require('../../logger/loggerErrorHandler');

router.route('/').get(async (req, res, next) => {
 try {const tasks = await tasksService.getAll(req.params);
  tasks.length ? await res.json(tasks) : res.status(400).send('Bad request')}
 catch (e) {
   next(new ErrorHandler(500, 'Internal Server Error'));
 }
});

router.route('/:id').get(async (req, res, next) => {
 try {const task = await tasksService.getById(req.params);
  task ? await res.json(task) : res.status(404).send('Task not found')}
 catch (e) {
   if (e instanceof ErrorHandler) {
     return handleError(e, res);
   }
   next(new ErrorHandler(500, 'Internal Server Error'));
 }
});

router.route('/').post(async (req, res, next) => {
 try {const task = await tasksService.createTask(req.params, req.body);
  task ? await res.json(task) : res.status(404).send('Task not found')}
 catch (e) {
   if (e instanceof ErrorHandler) {
     return handleError(e, res);
   }
   next(new ErrorHandler(500, 'Internal Server Error'));
 }
});

router.route('/:id').put(async (req, res, next) => {
  try {const task = await tasksService.updateTask(req.params, req.body);
  task ? await res.json(task) : res.status(404).send('Task not found')}
  catch (e) {
    if (e instanceof ErrorHandler) {
      return handleError(e, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
  }
});

router.route('/:id').delete(async (req, res, next) => {
 try {const task = await tasksService.deleteTask(req.params);
  task ? res.status(200).end() : res.status(404).send('Task not found')}
 catch (e) {
   if (e instanceof ErrorHandler) {
     return handleError(e, res);
   }
   next(new ErrorHandler(500, 'Internal Server Error'));
 }
});

module.exports = router;
