const User = require('./user.model');
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
const getUsersById = async (id) => {
  return users.find((user) => {
    return user.id === id;
  });
};
const createUser = async (params) => {
  const { login, name, password } = params;
  const newUser = new User(login, name, password);
  users.push(newUser);
  return newUser;
};
const updateUser = async (id, data) => {
  const user = users.find(item => item.id === id);
  Object.assign(user, data);
  return user;
};
const deleteUser = async (id) => {
  let index;
  for (let i = 0; i < users.length; i++){
    if (users[i].id === id){
      index = users[i].id;
    }
  }
  if (~index) {
    users.splice(index, 1);
    return true;
  } else return false;
};


module.exports = { getAll, getUsersById, createUser, updateUser, deleteUser };
