const usersRepo = require('./user.db.repository');

const getAll =  () => usersRepo.getAll();
const getUsersById = id => usersRepo.getUsersById(id);
const createUser = params => usersRepo.createUser(params);
const updateUser = (id, data) => usersRepo.updateUser(id, data);
const deleteUser = id => usersRepo.deleteUser(id);
const getUserLogin = data => usersRepo.getUserLogin(data);

module.exports = { getAll, getUsersById, createUser, updateUser, deleteUser, getUserLogin };
