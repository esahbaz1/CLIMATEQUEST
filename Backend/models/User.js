const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, default: 'Anonymous' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  xp: { type: Number, default: 0 },
  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
  completedActions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Action' }],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
