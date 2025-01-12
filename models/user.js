const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  Platform: {
    type: String,
  },
  Playtime: {
    type: String,
  },
  Status: {
    type: String,
    enum: ['Completed', 'Not started', 'started'],
  },
  Rating: {
    type: Number,
  },
  Image: {
    type: String,
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  games: [gameSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
