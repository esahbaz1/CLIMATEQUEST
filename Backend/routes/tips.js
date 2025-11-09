const express = require('express');
const router = express.Router();
const Tip = require('../models/Tip');

// GET all tips
router.get('/', async (req, res) => {
  try {
    const tips = await Tip.find();
    res.json(tips);
  } catch (err) {
    console.error('Error fetching tips:', err);
    res.status(500).json({ message: 'Server error while fetching tips' });
  }
});

module.exports = router;