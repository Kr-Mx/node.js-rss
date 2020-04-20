const User = require('./user.db.model');

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

module.exports = { getAll, getUsersById, createUser, updateUser, deleteUser };
