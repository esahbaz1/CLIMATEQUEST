const mongoose = require('mongoose');

const MissionSchema = new mongoose.Schema({
  title: String,
  description: String,
  co2Target: Number,
  options: [
    {
      name: String,
      impact: Number
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Mission', MissionSchema);
