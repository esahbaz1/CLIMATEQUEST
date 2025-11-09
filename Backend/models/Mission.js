const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  impact: { type: Number, required: true }
});

const missionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  options: [optionSchema]
});

module.exports = mongoose.model('Mission', missionSchema);
