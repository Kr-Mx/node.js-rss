const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { ErrorHandler, handleError } = require('../../logger/loggerErrorHandler');

router.route('/').get(async (req, res, next) => {
 try {const users = await usersService.getAll();
  users.length
    ? await res.json(users.map(User.toResponse))
    : res.status(404).send('Users not found')}
 catch (e) {
   next(new ErrorHandler(500, 'Internal Server Error'));
 }
});

router.route('/:id').get(async (req, res, next) => {
 try {const user = await usersService.getById(req.params.id);
  user
    ? await res.json(User.toResponse(user))
    : res.status(404).send('User not found')}
 catch (e) {
   if (e instanceof ErrorHandler) {
     return handleError(e, res);
   }
   next(new ErrorHandler(500, 'Internal Server Error'));
 }
});

router.route('/').post(async (req, res, next) => {
  try {const user = await usersService.createUser(req.body);
  user
    ? await res.json(User.toResponse(user))
    : res.status(404).send('User not found')}
  catch (e) {
    if (e instanceof ErrorHandler) {
      return handleError(e, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
  }
});

router.route('/:id').put(async (req, res, next) => {
 try {const user = await usersService.updateUser(req.params.id, req.body);
  user
    ? await res.json(User.toResponse(user))
    : res.status(404).send('User not found')}
 catch (e) {
   if (e instanceof ErrorHandler) {
     return handleError(e, res);
   }
   next(new ErrorHandler(500, 'Internal Server Error'));
 }
});

router.route('/:id').delete(async (req, res, next) => {
 try {const user = await usersService.deleteUser(req.params.id);
  user ? res.status(200).end() : res.status(404).send('User not found')}
 catch (e) {
   if (e instanceof ErrorHandler) {
     return handleError(e, res);
   }
   next(new ErrorHandler(500, 'Internal Server Error'));
 }
});

module.exports = router;
