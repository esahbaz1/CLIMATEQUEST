const express = require('express');
const router = express.Router();

// Simple AI response simulation
router.post('/', async (req, res) => {
  const { message } = req.body;

  // Demo responses
  let reply = "I'm not sure, but keep making sustainable choices!";
  if (message.toLowerCase().includes('co2')) reply = "Reducing CO₂ is key! Plant trees or use solar energy.";
  if (message.toLowerCase().includes('energy')) reply = "Saving energy helps! Turn off unused lights and devices.";

  res.json({ reply });
});

module.exports = router;
