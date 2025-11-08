const express = require('express');
const router = express.Router();
const Mission = require('../models/Mission');

// Get all missions
router.get('/', async (req, res) => {
  const missions = await Mission.find();
  res.json(missions);
});

// Get single mission by ID
router.get('/:id', async (req, res) => {
  const mission = await Mission.findById(req.params.id);
  res.json(mission);
});

// For demo: Add a mission
router.post('/', async (req, res) => {
  const mission = new Mission(req.body);
  await mission.save();
  res.json(mission);
});

module.exports = router;
