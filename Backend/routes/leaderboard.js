const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/Leaderboard');
const User = require('../models/User');

router.get('/', async (req, res) => {
  const leaders = await Leaderboard.find()
    .sort({ points: -1 })
    .limit(10)
    .populate('user', 'name');
  const formatted = leaders.map(l => ({ _id: l._id, name: l.user.name, points: l.points }));
  res.json(formatted);
});

module.exports = router;
