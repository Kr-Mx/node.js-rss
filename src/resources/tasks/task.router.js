const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const Task = require('./task.db.model');
const { ErrorHandler, handleError } = require('../../logger/loggerErrorHandler');

router.route('/').get(async (req, res, next) => {
   try{const tasks = await tasksService.getAll(req.params.id);
     tasks.length
       ? await res.status(200).json(tasks.map(Task.toResponse))
       : next(res.status(400).send('Bad request'))
   } catch (e) {
     next(new ErrorHandler(500, 'Internal Server Error'))
   }
  });

router.route('/:taskId').get(async (req, res, next) => {
  try{const task = await tasksService.getById(req.params.id, req.params.taskId);
  task ? await res.status(200).json(Task.toResponse(task)) : res.status(404).send('Task not found')}
catch (e) {
  if (e instanceof ErrorHandler) {
    return handleError(e, res);
  }
  next(new ErrorHandler(500, 'Internal Server Error'));
}
});

router.route('/').post(async (req, res, next) => {
  try {const task = await tasksService.createTask({...req.body, boardId: req.params.id});
    task ? await res.json(Task.toResponse(task)) : res.status(404).send('Task not found')}
  catch (e) {
    if (e instanceof ErrorHandler) {
      return handleError(e, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
  }
  });

router.route('/:taskId').put(async (req, res, next) => {
  try {
    const { id: boardId, taskId } = req.params;
    const task = await tasksService.updateTask({id: taskId, boardId, ...req.body});
    task ? await res.json(Task.toResponse(task)) : res.status(404).send('Task not found')}
  catch (e) {
    if (e instanceof ErrorHandler) {
      return handleError(e, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
  }
  });

router.route('/:taskId').delete(async (req, res, next) => {
  try {const task = await tasksService.deleteTask(req.params.id, req.params.taskId);
    task ? res.status(200).end() : res.status(404).send('Task not found')}
  catch (e) {
    if (e instanceof ErrorHandler) {
      return handleError(e, res);
    }
  }});

module.exports = router;
