const mongoose = require('mongoose');
require('dotenv').config();

// 1. Povezivanje na MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// 2. Definisanje Schema i Modela
const leaderboardSchema = new mongoose.Schema({
  name: String,
  points: Number,
  knowledge: Number,
  decisions: Number,
  speed: Number,
  members: Number,
  avgTime: String,
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

// 3. Podaci koje želiš dodati
const leaderboardData = [
  { name: 'EcoWarriors', points: 2450, knowledge: 850, decisions: 920, speed: 680, members: 4, avgTime: '12m 30s' },
  { name: 'Green Guardians', points: 2380, knowledge: 920, decisions: 780, speed: 680, members: 5, avgTime: '13m 15s' },
  { name: 'Climate Champions', points: 2290, knowledge: 800, decisions: 850, speed: 640, members: 3, avgTime: '14m 05s' },
  { name: 'Planet Protectors', points: 2150, knowledge: 750, decisions: 820, speed: 580, members: 4, avgTime: '15m 20s' },
  { name: 'Sustainability Squad', points: 2080, knowledge: 720, decisions: 780, speed: 580, members: 6, avgTime: '15m 45s' },
  { name: 'Earth Alliance', points: 1950, knowledge: 680, decisions: 730, speed: 540, members: 3, avgTime: '16m 30s' },
  { name: 'Carbon Crushers', points: 1890, knowledge: 650, decisions: 700, speed: 540, members: 4, avgTime: '17m 10s' },
  { name: 'Renewable Rangers', points: 1820, knowledge: 620, decisions: 680, speed: 520, members: 5, avgTime: '17m 55s' },
  { name: 'Eco Innovators', points: 1750, knowledge: 600, decisions: 650, speed: 500, members: 3, avgTime: '18m 20s' },
  { name: 'Future Farmers', points: 1680, knowledge: 580, decisions: 620, speed: 480, members: 4, avgTime: '19m 05s' },
];

// 4. Seed funkcija
const seedLeaderboard = async () => {
  try {
    await Leaderboard.deleteMany({}); // Očisti postojeće podatke (opcionalno)
    await Leaderboard.insertMany(leaderboardData);
    console.log('Leaderboard data inserted!');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

seedLeaderboard();
