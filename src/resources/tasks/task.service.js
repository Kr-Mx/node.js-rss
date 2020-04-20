const TaskRepo = require('./task.db.repository');

const getAll = id => TaskRepo.getAll(id);
const getById = (boardId, id) => TaskRepo.getById(boardId, id);
const createTask = data => TaskRepo.createTask(data);
const updateTask = data => TaskRepo.updateTask(data);
const deleteTask = (boardId, taskId) => TaskRepo.deleteTask(boardId, taskId);
const unassignUserFromTasks = userId => TaskRepo.unassignUserFromTasks(userId);
const deleteTasksFromBoard = boardId => TaskRepo.deleteTasksFromBoard(boardId);
module.exports = {
  getAll,
  getById,
  createTask,
  updateTask,
  deleteTask,
  unassignUserFromTasks,
  deleteTasksFromBoard
};
