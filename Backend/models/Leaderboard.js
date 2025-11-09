const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  name: String,
  points: Number,
  knowledge: Number,
  decisions: Number,
  speed: Number,
  members: Number,
  avgTime: String,
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
