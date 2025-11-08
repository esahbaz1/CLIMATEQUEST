import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
const Dashboard = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockMissions = [
      {
        _id: '1',
        title: 'Reduce CO2 in Your City',
        emoji: '🏭',
        description: 'Help reduce carbon emissions through sustainable transportation and energy choices',
        baseline: {
          current: 5.2,
          unit: 'tons per person',
          label: 'National CO2 emissions'
        },
        goal: {
          target: 10,
          unit: '% reduction',
          label: 'Target reduction'
        },
        impact: 'High',
        difficulty: 'Medium',
        participants: 2847,
        category: 'emissions'
      },
      {
        _id: '2',
        title: 'Protect the Forest',
        emoji: '🌲',
        description: 'Combat deforestation by supporting reforestation initiatives and sustainable practices',
        baseline: {
          current: 178000,
          unit: 'hectares lost',
          label: 'Annual deforestation'
        },
        goal: {
          target: 15,
          unit: '% reduction',
          label: 'Target reduction'
        },
        impact: 'Critical',
        difficulty: 'Hard',
        participants: 1523,
        category: 'deforestation'
      },
      {
        _id: '3',
        title: 'Save Energy',
        emoji: '⚡',
        description: 'Reduce energy consumption through efficient appliances and renewable sources',
        baseline: {
          current: 3.8,
          unit: 'MWh per capita',
          label: 'Average energy use'
        },
        goal: {
          target: 20,
          unit: '% reduction',
          label: 'Target reduction'
        },
        impact: 'High',
        difficulty: 'Easy',
        participants: 4192,
        category: 'energy'
      },
      {
        _id: '4',
        title: 'Cool Down Your City',
        emoji: '🌡️',
        description: 'Address urban heat islands through green spaces and sustainable urban planning',
        baseline: {
          current: 1.5,
          unit: '°C above normal',
          label: 'Urban temperature rise'
        },
        goal: {
          target: 0.5,
          unit: '°C reduction',
          label: 'Target cooling'
        },
        impact: 'Medium',
        difficulty: 'Medium',
        participants: 981,
        category: 'temperature'
      },
      {
        _id: '5',
        title: 'Reduce Plastic Waste',
        emoji: '♻️',
        description: 'Minimize single-use plastics and promote circular economy practices',
        baseline: {
          current: 52,
          unit: 'kg per person',
          label: 'Annual plastic waste'
        },
        goal: {
          target: 30,
          unit: '% reduction',
          label: 'Target reduction'
        },
        impact: 'High',
        difficulty: 'Easy',
        participants: 3567,
        category: 'waste'
      },
      {
        _id: '6',
        title: 'Preserve Water Resources',
        emoji: '💧',
        description: 'Conserve water through efficient usage and protection of water sources',
        baseline: {
          current: 142,
          unit: 'liters per day',
          label: 'Average water consumption'
        },
        goal: {
          target: 25,
          unit: '% reduction',
          label: 'Target reduction'
        },
        impact: 'Critical',
        difficulty: 'Medium',
        participants: 2103,
        category: 'water'
      }
    ];
    setTimeout(() => {
      setMissions(mockMissions);
      setLoading(false);
    }, 800);
  }, []);

  const getImpactColor = (impact) => {
    switch(impact) {
      case 'Critical': return '#dc2626';
      case 'High': return '#ea580c';
      case 'Medium': return '#ca8a04';
      default: return '#16a34a';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#dc2626';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div style={{ textAlign: 'center', padding: '4rem', color: '#065f46' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
          <p style={{ fontSize: '1.25rem' }}>Loading missions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>
          <span className="header-emoji">🌍</span>
          Choose Your Mission
          <span className="header-emoji">🌱</span>
        </h1>
        <p>Take action based on real environmental data. Every mission counts!</p>
      </div>

      <div className="mission-info-box">
        <h3>📊 About These Missions</h3>
        <p>Each mission is based on real ASDI (Anthropogenic Sources of Data Intelligence) statistics including national emission rates, deforestation data, energy consumption patterns, and climate indicators. Your actions contribute to measurable environmental impact.</p>
      </div>

      <div className="missions-grid">
        {missions.map(mission => (
          <div key={mission._id} className="mission-card">
            <div className="mission-emoji">{mission.emoji}</div>
            
            <div className="mission-content">
              <h3 className="mission-title">{mission.title}</h3>
              <p className="mission-description">{mission.description}</p>

              <div className="mission-stats">
                <div className="stat-group">
                  <div className="stat-label">📍 Baseline Status</div>
                  <div className="stat-value">
                    <strong>{mission.baseline.current}</strong> {mission.baseline.unit}
                  </div>
                  <div className="stat-sublabel">{mission.baseline.label}</div>
                </div>

                <div className="stat-divider"></div>

                <div className="stat-group">
                  <div className="stat-label">🎯 Mission Goal</div>
                  <div className="stat-value goal-value">
                    <strong>{mission.goal.target}</strong> {mission.goal.unit}
                  </div>
                  <div className="stat-sublabel">{mission.goal.label}</div>
                </div>
              </div>

              <div className="mission-meta">
                <div className="meta-badges">
                  <span 
                    className="badge impact-badge"
                    style={{ 
                      background: getImpactColor(mission.impact) + '20',
                      color: getImpactColor(mission.impact),
                      border: `2px solid ${getImpactColor(mission.impact)}`
                    }}
                  >
                    Impact: {mission.impact}
                  </span>
                  <span 
                    className="badge difficulty-badge"
                    style={{ 
                      background: getDifficultyColor(mission.difficulty) + '20',
                      color: getDifficultyColor(mission.difficulty),
                      border: `2px solid ${getDifficultyColor(mission.difficulty)}`
                    }}
                  >
                    {mission.difficulty}
                  </span>
                </div>
                
                <div className="participants">
                  <span className="participants-icon">👥</span>
                  <span className="participants-count">{mission.participants.toLocaleString()}</span>
                  <span className="participants-label">active participants</span>
                </div>
              </div>

              <button className="mission-button">
                Accept Mission →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-footer">
        <div className="footer-content">
          <h3>🌟 Ready to Make a Difference?</h3>
          <p>Join thousands of eco-warriors taking action on climate change. Every mission you complete brings us closer to a sustainable future.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;