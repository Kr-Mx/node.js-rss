const router = require('express').Router();
const User = require('./user.db.model');
const usersService = require('./user.service');
const { ErrorHandler, handleError } = require('../../logger/loggerErrorHandler');
const unassignUserFromTasks = require('../tasks/task.service')
  .unassignUserFromTasks;

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    if (users.length) {
      await res.json(users.map(User.toResponse));
    } else res.status(404).send('Users not found');
  } catch (e) {
    next(new ErrorHandler(500, 'Internal Server Error'));
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.getUsersById(req.params.id);
    console.log(user);
    if (user) {
      await res.json(User.toResponse(user));
    } else res.status(404).send('User not found');
  } catch (e) {
    if (e instanceof ErrorHandler) {
      return handleError(e, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const user = await usersService.createUser(req.body);
    if (user) {
      await res.json(User.toResponse(user));
    } else res.status(404).send('User not found');
  } catch (e) {
    if (e instanceof ErrorHandler) {
      return handleError(e, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const user = await usersService.updateUser({
      _id: req.params.id,
      ...req.body
    });
    if (user) {
      await res.json(User.toResponse(user));
    } else res.status(404).send('User not found');
  } catch (e) {
    if (e instanceof ErrorHandler) {
      return handleError(e, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const user = await usersService.deleteUser(req.params.id);

    if (user) {
       await unassignUserFromTasks(req.params.id);
      res.status(200).end();
    } else res.status(404).send('User not found');
  } catch (e) {
    if (e instanceof ErrorHandler) {
      return handleError(e, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
  }
});

module.exports = router;
