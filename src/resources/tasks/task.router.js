const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params);
  tasks.length ? await res.json(tasks) : res.status(400).send('Bad request');
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.getById(req.params);
  task ? await res.json(task) : res.status(404).send('Task not found');
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.createTask(req.params, req.body);
  task ? await res.json(task) : res.status(404).send('Task not found');
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.updateTask(req.params, req.body);
  task ? await res.json(task) : res.status(404).send('Task not found');
});

router.route('/:id').delete(async (req, res) => {
  const task = await tasksService.deleteTask(req.params);
  task ? res.status(200).end() : res.status(404).send('Task not found');
});

module.exports = router;
