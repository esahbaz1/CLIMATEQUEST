import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import LoginSignup from './pages/LoginSignup';
import UserProfile from './pages/UserProfile';
import Dashboard from './pages/Dashboard';
import MissionSimulation from './pages/MissionSimulation';
import EcoBotChat from './pages/EcoBotChat';
import LevelsRewards from './pages/LevelRewards';
import Leaderboard from './pages/Leaderboard';
import LearnAct from './pages/LearnAct';
import DataVisualization from './pages/DataVisualization';
import CommunityChallenges from './pages/CommunityChallenges';

import './styles/main.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LoginSignup />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mission/:id" element={<MissionSimulation />} />
            <Route path="/ecobot" element={<EcoBotChat />} />
            <Route path="/levels" element={<LevelsRewards />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/learn-act" element={<LearnAct />} />
            <Route path="/data-visualization" element={<DataVisualization />} />
            <Route path="/community-challenges" element={<CommunityChallenges />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
