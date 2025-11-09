import React, { useEffect, useState } from 'react';
import '../styles/Leaderboard.css';

const API_BASE =
  process.env.NODE_ENV === 'production'
    ? 'https://tvoj-backend-na-renderu.onrender.com' // <-- zamijeni sa tvojim Render linkom
    : 'http://localhost:3000';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        // Ako deployaš backend na Render, promijeni URL u svoj backend link
        const res = await fetch(`${API_BASE}/api/leaderboard`);

        if (!res.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }

        const data = await res.json();
        setLeaders(data);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Unable to load leaderboard. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  const getRankClass = (idx) => {
    if (idx === 0) return 'rank-1';
    if (idx === 1) return 'rank-2';
    if (idx === 2) return 'rank-3';
    return 'rank-default';
  };

  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard-container">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  if (leaders.length === 0) {
    return (
      <div className="leaderboard-container">
        <p className="empty-text">No teams found yet. Be the first to take action! 🌍</p>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-wrapper">
        {/* Header */}
        <div className="leaderboard-header">
          <h1>
            <span className="header-emoji">🏆</span>
            Global Leaderboard
            <span className="header-emoji">🏆</span>
          </h1>
          <p>Top 10 Climate Action Teams</p>
          <p
            style={{
              fontSize: '0.875rem',
              color: '#059669',
              maxWidth: '42rem',
              margin: '0.5rem auto 0',
            }}
          >
            Teams earn points through knowledge (quiz performance), decisions (climate impact), 
            and speed (mission completion time). Working together for a sustainable future!
          </p>
        </div>

        {/* Legend */}
        <div className="leaderboard-legend">
          <div className="legend-title">
            <span style={{ fontSize: '1.25rem' }}>⚡</span>
            Scoring Dimensions
          </div>
          <div className="legend-grid">
            <div className="legend-item" style={{ background: '#dbeafe' }}>
              <span style={{ fontSize: '1.875rem' }}>🧠</span>
              <div>
                <h4 style={{ color: '#1e3a8a' }}>Knowledge</h4>
                <p style={{ color: '#1e40af' }}>Quiz performance & accuracy</p>
              </div>
            </div>
            <div className="legend-item" style={{ background: '#d1fae5' }}>
              <span style={{ fontSize: '1.875rem' }}>🍃</span>
              <div>
                <h4 style={{ color: '#065f46' }}>Decisions</h4>
                <p style={{ color: '#047857' }}>Climate impact choices</p>
              </div>
            </div>
            <div className="legend-item" style={{ background: '#f3e8ff' }}>
              <span style={{ fontSize: '1.875rem' }}>⏱️</span>
              <div>
                <h4 style={{ color: '#581c87' }}>Speed</h4>
                <p style={{ color: '#6b21a8' }}>Mission completion time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Cards */}
        <div className="leaderboard-list">
          {leaders.map((team, idx) => (
            <div key={team._id || idx} className={`leaderboard-card ${idx < 3 ? 'top-three' : ''}`}>
              <div className={`rank-badge ${getRankClass(idx)}`}>
                {idx < 3 ? '🏆' : idx + 1}
              </div>

              <div className="team-info">
                <div className="team-header">
                  <h3 className="team-name">{team.name}</h3>
                  <span className="team-members">
                    <span style={{ fontSize: '1rem' }}>👥</span>
                    {team.members} members
                  </span>
                </div>

                <div className="stats-grid">
                  <div className="stats-box stats-knowledge">
                    <div className="stats-box-header">
                      <span>🧠</span>
                      Knowledge
                    </div>
                    <p className="stats-box-value">{team.knowledge}</p>
                  </div>
                  <div className="stats-box stats-decisions">
                    <div className="stats-box-header">
                      <span>🍃</span>
                      Decisions
                    </div>
                    <p className="stats-box-value">{team.decisions}</p>
                  </div>
                  <div className="stats-box stats-speed">
                    <div className="stats-box-header">
                      <span>⏱️</span>
                      Speed
                    </div>
                    <p className="stats-box-value">{team.speed}</p>
                  </div>
                  <div className="stats-box stats-avgtime">
                    <div className="stats-box-header">
                      <span>⚡</span>
                      Avg Time
                    </div>
                    <p className="stats-box-value">{team.avgTime}</p>
                  </div>
                </div>

                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${(team.points / 2500) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="total-points">
                <div className="points">{team.points}</div>
                <div className="label">total pts</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="leaderboard-footer">
          <div className="footer-box">
            <h3>Collaboration Over Competition</h3>
            <p>
              Every team here is making a difference. Together, we're building a sustainable future 
              through knowledge, smart decisions, and swift action. Keep up the amazing work!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
