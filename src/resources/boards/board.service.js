const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const getById = id => boardsRepo.getById(id);
const createBoard = params => boardsRepo.createBoard(params);
const updateBoard = (id, data) => boardsRepo.updateBoard(id, data);
const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };
