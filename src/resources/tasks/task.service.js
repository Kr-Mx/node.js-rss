const tasksRepo = require('./task.memory.repository');

const getAll = params => tasksRepo.getAll(params);
const getById = params => tasksRepo.getById(params);
const createTask = (params, data) => tasksRepo.createTask(params, data);
const updateTask = (params, data) => tasksRepo.updateTask(params, data);
const deleteTask = params => tasksRepo.deleteTask(params);

module.exports = { getAll, getById, createTask, updateTask, deleteTask };
