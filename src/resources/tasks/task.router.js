const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params);
  if (tasks.length) {
    res.json(tasks);
  } else {
    res.status(400).end('Bad request');
  }
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.getById(req.params);
  if (task) {
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

router.route('/').post(async (req, res) => {
  const newTask = await tasksService.createTask(req.params, req.body);
  res.json(newTask);
});

router.route('/:id').put(async (req, res) => {
  const updatedTask = await tasksService.updateTask(req.params, req.body);
  if (updatedTask) {
    res.json(updatedTask);
  } else {
    res.status(404).send('Task not found');
  }
});

router.route('/:id').delete(async (req, res) => {
  const deletedTask = await tasksService.deleteTask(req.params);
  if (deletedTask) {
    res.status(200).end();
  }
  res.status(404).send('Task not found');

});

module.exports = router;
