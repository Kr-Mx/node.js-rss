const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getUserById = (id) => usersRepo.getUsersById(id);
const createUser = (params) => usersRepo.createUser(params);
const updateUser = (id, data) => usersRepo.updateUser(id, data);
const deleteUser = (id) => usersRepo.deleteUser(id);

module.exports = { getAll };
