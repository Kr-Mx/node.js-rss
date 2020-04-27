const uuid = require('uuid');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const salt_option = 10;

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
  name: String,
  login: String,
  password: String,
});

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(salt_option);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.statics.toResponse = ({ id, name, login }) => ({ id, name, login });

const User = mongoose.model('User', userSchema);
module.exports = User;
