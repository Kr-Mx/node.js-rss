const uuid = require('uuid');
const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: String,
  order: Number
});

const BoardSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: String,
  columns: {
    type: [ColumnSchema]
  }
});

BoardSchema.statics.toResponse = ({ id, title, columns }) => ({ id, title, columns });

const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;
