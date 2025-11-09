const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/Leaderboard');

// GET /api/leaderboard
router.get('/', async (req, res) => {
  try {
    const leaders = await Leaderboard.find().sort({ points: -1 }); // sort po bodovima
    res.json(leaders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
