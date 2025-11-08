const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
  name: String,
  effect: Number, // CO2 saved
}, { timestamps: true });

module.exports = mongoose.model('Action', ActionSchema);
