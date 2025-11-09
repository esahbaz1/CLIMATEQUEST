// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// 🔹 Rute
const authRoutes = require('./routes/authRoutes');

// 🔹 Modeli
const Tip = require('./models/Tip');
const Leaderboard = require('./models/Leaderboard'); // <-- Dodano

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Rute
app.use('/api/auth', authRoutes);

// ✅ Ruta za dohvat tipova
app.get('/api/tips', async (req, res) => {
  try {
    const tips = await Tip.find();
    res.json(tips);
  } catch (err) {
    console.error('Error fetching tips:', err);
    res.status(500).json({ error: 'Error fetching tips' });
  }
});

// ✅ Ruta za dohvat leaderboarda
app.get('/api/leaderboard', async (req, res) => {
  try {
    const leaders = await Leaderboard.find().sort({ points: -1 }); // sort po bodovima
    res.json(leaders);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ error: 'Error fetching leaderboard' });
  }
});

// ✅ MongoDB konekcija
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.log('❌ MongoDB connection error:', err));
