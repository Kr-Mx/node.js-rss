const Task = require('./task.model');
const tasks = [
  {
    id: '1',
    title: 'TQ',
    order: '1',
    description: 'DQ',
    userId: '1',
    boardId: '1',
    columnId: '1'
  },
  {
    id: '2',
    title: 'TE',
    order: '2',
    description: 'DW',
    userId: '2',
    boardId: '2',
    columnId: '3'
  },
  {
    id: '3',
    title: 'TR',
    order: '3',
    description: 'DE',
    userId: '3',
    boardId: '3',
    columnId: '5'
  }
];

const getAll = async (params) => {
  return tasks.filter((task) =>{return task.boardId === params.boardId});
};

const getById = async (params) => {
  const task = tasks.find((task)=>{return task.id === params.id});
  if (!task) {
    return;
  }
  return task;
};

const createTask = async (params, data) => {
  const { title, order, description, userId, columnId } = data;
  const boardId = params.boardId;
  const newTask = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  tasks.push(newTask);
  return newTask;
};

const updateTask = async (params, data) => {
  const task = tasks
    .filter(task => task.boardId === params.boardId)
    .find(task => task.id === params.id);
  if (task) {
    data.boardId = params.boardId;
    Object.assign(task, data);
    return task;}
  return false;
};

const deleteTask = async (params) => {
  const index = tasks.filter(
    (task) =>
    {return (task.boardId === params.boardId && task.id === params.id)}
  );
  if (index.length) {
    tasks.splice(index, 1);
    return true;
  } else return false;
};


module.exports = { getAll, getById, createTask, updateTask, deleteTask };
