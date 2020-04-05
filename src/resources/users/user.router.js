const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  users.length
    ? await res.json(users.map(User.toResponse))
    : res.status(404).send('Users not found');
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getById(req.params.id);
  user
    ? await res.json(User.toResponse(user))
    : res.status(404).send('User not found');
});

router.route('/').post(async (req, res) => {
  const user = await usersService.createUser(req.body);
  user
    ? await res.json(User.toResponse(user))
    : res.status(404).send('User not found');
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.updateUser(req.params.id, req.body);
  user
    ? await res.json(User.toResponse(user))
    : res.status(404).send('User not found');
});

router.route('/:id').delete(async (req, res) => {
  const user = await usersService.deleteUser(req.params.id);
  user ? res.status(200).end() : res.status(404).send('User not found');
});

module.exports = router;
