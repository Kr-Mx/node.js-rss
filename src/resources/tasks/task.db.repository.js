const Task = require('./task.db.model');

const getAll = async boardId => {return Task.find({ boardId })};
const getById = async (boardId, id) => {return Task.findOne({ _id: id, boardId })};
const createTask = async data => {return Task.create(data)};
const updateTask = async (data) => {return Task.updateOne({ _id: data.id }, data)};
const deleteTask = async (boardId, id) => {return Task.deleteOne({ _id: id, boardId })};
const unassignUserFromTasks = userId => {return Task.updateMany({ userId: userId }, { userId: null })};

module.exports = {
  getAll,
  getById,
  createTask,
  updateTask,
  deleteTask,
  unassignUserFromTasks
};
