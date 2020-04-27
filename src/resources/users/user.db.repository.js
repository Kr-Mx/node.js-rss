const User = require('./user.db.model');
const bcrypt = require('bcrypt');

const getAll = async () => {
  return User.find({});
};

const getUsersById = async (id) => {
  return User.findOne({ _id: id });
};

const createUser = async params => {
  return User.create(params);
};

const updateUser = async (data) => {
  return User.update({ _id: data.id }, data);
};

const deleteUser = async id => {
  return User.deleteOne({ _id: id });
};

const getUserLogin = async data => {
  const user = await User.findOne({ login: data.login });
  const isCompare = await bcrypt.compare(data.password, user.password);
  return isCompare ? user : {};
};

module.exports = { getAll, getUsersById, createUser, updateUser, deleteUser, getUserLogin };
