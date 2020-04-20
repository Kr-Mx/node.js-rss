const mongoose = require('mongoose');
const User = require('../resources/users/user.db.model');
const Task = require('../resources/tasks/task.db.model');
const Board = require('../resources/boards/board.db.model');
const { MONGO_CONNECTION_STRING } = require('./config');
const Users = [
  new User({
    name: 'Max',
    login: 'Maxis',
    password: 'Maxis11'
  }),
  new User({
    name: 'Mix',
    login: 'Mixis',
    password: 'Mixis11'
  })
];
const Tasks = [
  new Task({
    title: 'TQ',
    order: '1',
    description: 'DQ',
    userId: '1',
    boardId: '1',
    columnId: '1'
  }),
  new Task({
    title: 'TE',
    order: '2',
    description: 'DW',
    userId: '2',
    boardId: '2',
    columnId: '3'
  }),
  new Task({
    title: 'TR',
    order: '3',
    description: 'DE',
    userId: '3',
    boardId: '3',
    columnId: '5'
  })
];
const Boards = [
  new Board({
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
  }),
  new Board({
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
  }),
  new Board({
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
  })
];

const connectToDB = (cb) => {
  mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected!');
    db.dropCollection('users');
    db.dropCollection('tasks');
    db.dropCollection('boards');
    User.insertMany(Users);
    Task.insertMany(Tasks);
    Board.insertMany(Boards);
    cb();
  });
};

module.exports = connectToDB;
