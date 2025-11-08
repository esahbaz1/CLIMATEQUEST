const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  points: Number,
}, { timestamps: true });

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);
