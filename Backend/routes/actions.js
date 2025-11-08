const express = require('express');
const router = express.Router();
const Action = require('../models/Action');

// Get all actions
router.get('/', async (req, res) => {
  const actions = await Action.find();
  res.json(actions);
});

// Add new action
router.post('/', async (req, res) => {
  const action = new Action(req.body);
  await action.save();
  res.json(action);
});

module.exports = router;
