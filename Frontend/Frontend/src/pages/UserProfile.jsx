import React, { useState } from 'react';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const [userData] = useState({
    username: 'EcoWarrior',
    email: 'ecowarrior@example.com',
    joinDate: 'March 2024',
    totalPoints: 2450,
    rank: '#127',
    completedMissions: 24,
    activeMissions: 3,
    badges: [
      { id: 1, name: 'First Steps', icon: '🌱', description: 'Completed your first mission' },
      { id: 2, name: 'Tree Planter', icon: '🌳', description: 'Planted 10 trees' },
      { id: 3, name: 'Recycling Hero', icon: '♻️', description: 'Recycled 50 items' },
      { id: 4, name: 'Water Saver', icon: '💧', description: 'Saved 1000L of water' },
      { id: 5, name: 'Energy Efficient', icon: '⚡', description: 'Reduced energy usage' },
      { id: 6, name: 'Community Leader', icon: '👥', description: 'Inspired 5 others' }
    ],
    recentMissions: [
      { id: 1, title: 'Plant a Tree', date: '2024-11-05', points: 100, status: 'completed' },
      { id: 2, title: 'Reduce Plastic Use', date: '2024-11-03', points: 75, status: 'completed' },
      { id: 3, title: 'Community Clean-up', date: '2024-10-28', points: 150, status: 'completed' }
    ]
  });

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            <span className="avatar-initial">{userData.username.charAt(0)}</span>
          </div>
          <div className="profile-status">
            <div className="status-indicator"></div>
          </div>
        </div>
        <div className="profile-info">
          <h1>{userData.username}</h1>
          <p className="email">{userData.email}</p>
          <p className="join-date">Member since {userData.joinDate}</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <h3>{userData.totalPoints}</h3>
            <p>Total Points</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{userData.rank}</h3>
            <p>Global Rank</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{userData.completedMissions}</h3>
            <p>Missions Done</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>{userData.activeMissions}</h3>
            <p>Active Missions</p>
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'badges' ? 'active' : ''}`}
          onClick={() => setActiveTab('badges')}
        >
          Badges
        </button>
        <button 
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="section-card">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {userData.recentMissions.map(mission => (
                  <div key={mission.id} className="activity-item">
                    <div className="activity-icon">✓</div>
                    <div className="activity-details">
                      <h4>{mission.title}</h4>
                      <p>{mission.date}</p>
                    </div>
                    <div className="activity-points">+{mission.points} pts</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="badges-section">
            <h2>Your Achievements</h2>
            <div className="badges-grid">
              {userData.badges.map(badge => (
                <div key={badge.id} className="badge-card">
                  <div className="badge-icon">{badge.icon}</div>
                  <h3>{badge.name}</h3>
                  <p>{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="history-section">
            <h2>Mission History</h2>
            <div className="history-list">
              {userData.recentMissions.map(mission => (
                <div key={mission.id} className="history-item">
                  <div className="history-status completed">
                    <span>✓</span>
                  </div>
                  <div className="history-details">
                    <h4>{mission.title}</h4>
                    <p>Completed on {mission.date}</p>
                  </div>
                  <div className="history-points">
                    <span className="points-badge">+{mission.points}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;