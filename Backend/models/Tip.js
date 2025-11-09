const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  impact: { type: String, required: true },
  description: { type: String, required: true },
  points: { type: Number, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  icon: { type: String, required: true },
});

module.exports = mongoose.model('Tip', tipSchema);