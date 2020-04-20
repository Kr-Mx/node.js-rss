const Board = require('./board.db.model');

const getAll = async () => Board.find({});
const getById = async id => Board.findOne({ _id: id });
const createBoard = async newBoard => Board.create(newBoard);
const updateBoard = async updateData => Board.update({ _id: updateData.id }, updateData);
const deleteBoard = async id => Board.deleteOne({ _id: id });

module.exports = {
  getAll,
  getById,
  createBoard,
  updateBoard,
  deleteBoard
};
