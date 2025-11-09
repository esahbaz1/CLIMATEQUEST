// models/LeaderboardTeam.js
const mongoose = require('mongoose');

const leaderboardTeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  points: { type: Number, default: 0 },
  knowledge: { type: Number, default: 0 },
  decisions: { type: Number, default: 0 },
  speed: { type: Number, default: 0 },
  members: { type: Number, default: 1 },
  avgTime: { type: String, default: '0m 0s' }
}, { timestamps: true });

module.exports = mongoose.model('LeaderboardTeam', leaderboardTeamSchema);
