const router = require('express').Router();
const boardsService = require('./board.service');
const { ErrorHandler, handleError } = require('../../logger/loggerErrorHandler');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardsService.getAll();
    boards.length
      ? await res.json(boards)
      : res.status(404).send('Boards not found');
  } catch (e) {
    next(new ErrorHandler(500, 'Internal Server Error'));
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardsService.getById(req.params.id);
    board ? await res.json(board) : res.status(404).send('Board not found');
  } catch (e) {
    if (e instanceof ErrorHandler) {
      return handleError(e, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
  }

});

router.route('/').post(async (req, res, next) => {
  try {
    const board = await boardsService.createBoard(req.body);
    board ? await res.json(board) : res.status(404).send('Board not found');
  } catch (e) {
    if (e instanceof ErrorHandler) {
      return handleError(e, res);
    }
    next(new ErrorHandler(500, 'Internal Server Error'));
  }
});

router.route('/:id').put(async (req, res, next) => {
 try {const board = boardsService.updateBoard(req.params.id, req.body);
  board ? await res.json(board) : res.status(404).send('Board not found');}
 catch (e) {
   if (e instanceof ErrorHandler) {
     return handleError(e, res);
   }
   next(new ErrorHandler(500, 'Internal Server Error'));
 }
});

router.route('/:id').delete(async (req, res, next) => {
 try {const board = await boardsService.deleteBoard(req.params.id);
  board
    ? res.status(204).send('No content')
    : res.status(404).send('Board not found');}
 catch (e) {
   if (e instanceof ErrorHandler) {
     return handleError(e, res);
   }
   next(new ErrorHandler(500, 'Internal Server Error'));
 }
});

module.exports = router;
