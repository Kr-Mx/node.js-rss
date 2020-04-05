const Board = require('./board.model');
const { tasks } = require('../tasks/task.memory.repository');
const boards = [
  {
    id: '1',
    title: 'TQ',
    columns: [
      {
        id: '1',
        title: 'CQ',
        order: 1
      },
      {
        id: '2',
        title: 'CW',
        order: 2
      }
    ]
  },
  {
    id: '2',
    title: 'TW',
    columns: [
      {
        id: '3',
        title: 'CE',
        order: 3
      },
      {
        id: '4',
        title: 'CR',
        order: 4
      }
    ]
  },
  {
    id: '3',
    title: 'TE',
    columns: [
      {
        id: '5',
        title: 'CT',
        order: 5
      },
      {
        id: '6',
        title: 'CY',
        order: 6
      }
    ]
  }
];

const getAll = async () => {
  return boards;
};

const getById = async (id) => {
  return boards.find(board => board.id === id);
};

const createBoard = async (params) => {
  const board = new Board(params);
  boards.push(board);
  return board;
};

const updateBoard = async (id, data) => {
  const index = boards.findIndex(board => board.id === id);
  return boards[index] = data;
};

const deleteBoard = async (id) => {
  const index = boards.findIndex(user => user.id === id);
  if (~index) {
    for (let ind = 0; ind < tasks.length; ind+=1) {
      if (tasks[ind].boardId === id) {
        tasks.splice(ind, 1);
        ind--;
      }
    }
    return boards.splice(index, 1);
  }
};

module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };
