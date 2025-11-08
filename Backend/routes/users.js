const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user profile (demo, assume first user)
router.get('/me', async (req, res) => {
  const user = await User.findOne().populate('badges completedActions');
  res.json(user);
});

// Get badges of user
router.get('/me/badges', async (req, res) => {
  const user = await User.findOne().populate('badges');
  res.json(user.badges || []);
});

module.exports = router;
