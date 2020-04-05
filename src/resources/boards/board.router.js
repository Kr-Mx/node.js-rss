const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  (boards.length) ? await res.json(boards) : res.status(404).send('Boards not found');
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getById(req.params.id);
   (board) ? await res.json(board) : res.status(404).send('Board not found');
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.createBoard(req.body);
  (board) ? await res.json(board) : res.status(404).send('Board not found');
});

router.route('/:id').put(async (req, res) => {
  const board = boardsService.updateBoard(req.params.id, req.body);
  (board) ? await res.json(board) : res.status(404).send('Board not found');
});

router.route('/:id').delete(async (req, res) => {
  const board = await boardsService.deleteBoard(req.params.id);
   (board) ? res.status(204).send('No content') : res.status(404).send('Board not found');
});

module.exports = router;
