const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
  },
  playtime: {
    type: String,
  },
  status: {
    type: String,
    enum: ['completed', 'not started', 'started', 'in progress'],
  },
  rating: {
    type: Number,
  },
  image: {
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
