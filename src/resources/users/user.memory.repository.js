const User = require('./user.model');
const { tasks } = require('../tasks/task.memory.repository');
const users = [
  {
    id: '1',
    name: 'Max',
    login: 'Maxis',
    password: 'Maxis11'
  },
  {
    id: '2',
    name: 'Mix',
    login: 'Mixis',
    password: 'Mixis11'
  },
  {
    id: '3',
    name: 'Mex',
    login: 'Mexis',
    password: 'Mexis11'
  }
];

const getAll = async () => {
  return users;
};

const getUsersById = async id => users.find(user => user.id === id);

const createUser = async params => {
  const user = new User(params);
  users.push(user);
  return user;
};

const updateUser = async (id, data) =>
  Object.assign(
    users.find(item => item.id === id),
    data
  );

const deleteUser = async id => {
  const index = await users.findIndex(user => user.id === id);
  if (~index) {
    tasks.forEach(task => {
      task.userId === id ? (task.userId = null) : null;
    });
    return users.splice(index, 1);
  }
};

module.exports = { getAll, getUsersById, createUser, updateUser, deleteUser };
