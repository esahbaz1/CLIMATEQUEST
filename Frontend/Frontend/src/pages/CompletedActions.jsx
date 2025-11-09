import React, { useState, useEffect } from 'react';
import './CompletedActions.css';

const CompletedActions = () => {
  const [completedTips, setCompletedTips] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalCO2Saved, setTotalCO2Saved] = useState(0);
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    const saved = localStorage.getItem('completedTips');
    if (saved) {
      const completed = JSON.parse(saved);
      setCompletedTips(completed);
      
      const points = completed.reduce((sum, tip) => sum + tip.points, 0);
      setTotalPoints(points);
      setTotalCO2Saved(Math.round(points * 0.5));
    }
  }, []);

  const sortedTips = [...completedTips].sort((a, b) => {
    switch(sortBy) {
      case 'recent':
        return new Date(b.completedDate) - new Date(a.completedDate);
      case 'oldest':
        return new Date(a.completedDate) - new Date(b.completedDate);
      case 'points':
        return b.points - a.points;
      default:
        return 0;
    }
  });

  const getAchievementLevel = () => {
    if (totalPoints >= 1000) return { level: 'Eco Champion', color: '#15803d', icon: '👑' };
    if (totalPoints >= 500) return { level: 'Green Hero', color: '#16a34a', icon: '🌟' };
    if (totalPoints >= 250) return { level: 'Earth Warrior', color: '#22c55e', icon: '⚡' };
    if (totalPoints >= 100) return { level: 'Sustainability Star', color: '#4ade80', icon: '⭐' };
    return { level: 'Eco Beginner', color: '#86efac', icon: '🌱' };
  };

  const achievement = getAchievementLevel();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getCategoryStats = () => {
    const stats = {};
    completedTips.forEach(tip => {
      if (!stats[tip.category]) {
        stats[tip.category] = { count: 0, points: 0 };
      }
      stats[tip.category].count++;
      stats[tip.category].points += tip.points;
    });
    return Object.entries(stats).sort((a, b) => b[1].points - a[1].points);
  };

  const categoryStats = getCategoryStats();

  const handleRemove = (tipId) => {
    const updated = completedTips.filter(tip => tip.id !== tipId);
    setCompletedTips(updated);
    localStorage.setItem('completedTips', JSON.stringify(updated));
    
    const points = updated.reduce((sum, tip) => sum + tip.points, 0);
    setTotalPoints(points);
    setTotalCO2Saved(Math.round(points * 0.5));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all completed actions? This cannot be undone.')) {
      setCompletedTips([]);
      setTotalPoints(0);
      setTotalCO2Saved(0);
      localStorage.removeItem('completedTips');
    }
  };

  return (
    <div className="completed-container">
      <div className="completed-header">
        <div className="header-content">
          <h1>Your Impact Journey</h1>
          <p>Track your sustainability achievements and progress</p>
        </div>
        
        <div className="achievement-badge">
          <span className="achievement-icon">{achievement.icon}</span>
          <div className="achievement-info">
            <span className="achievement-level" style={{ color: achievement.color }}>
              {achievement.level}
            </span>
            <span className="achievement-points">{totalPoints} points</span>
          </div>
        </div>
      </div>

      <div className="impact-overview">
        <div className="impact-card primary">
          <div className="impact-icon">🌍</div>
          <div className="impact-content">
            <span className="impact-value">{totalCO2Saved}kg</span>
            <span className="impact-label">CO₂ Saved</span>
            <span className="impact-detail">Equivalent to planting {Math.round(totalCO2Saved / 20)} trees</span>
          </div>
        </div>

        <div className="impact-card">
          <div className="impact-icon">✅</div>
          <div className="impact-content">
            <span className="impact-value">{completedTips.length}</span>
            <span className="impact-label">Actions Completed</span>
            <span className="impact-detail">Keep up the great work!</span>
          </div>
        </div>

        <div className="impact-card">
          <div className="impact-icon">📈</div>
          <div className="impact-content">
            <span className="impact-value">{categoryStats.length}</span>
            <span className="impact-label">Categories Explored</span>
            <span className="impact-detail">Diversifying your impact</span>
          </div>
        </div>
      </div>

      {categoryStats.length > 0 && (
        <div className="category-breakdown">
          <h2>Impact by Category</h2>
          <div className="category-stats-grid">
            {categoryStats.map(([category, stats]) => (
              <div key={category} className="category-stat-card">
                <div className="category-stat-header">
                  <span className="category-name">{category}</span>
                  <span className="category-count">{stats.count} actions</span>
                </div>
                <div className="category-stat-bar">
                  <div 
                    className="category-stat-fill"
                    style={{ 
                      width: `${(stats.points / totalPoints) * 100}%`,
                      background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)'
                    }}
                  />
                </div>
                <span className="category-points">{stats.points} points</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="completed-actions-section">
        <div className="section-header">
          <h2>Completed Actions</h2>
          <div className="section-controls">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="points">Highest Points</option>
            </select>
            
            {completedTips.length > 0 && (
              <button className="clear-btn" onClick={handleClearAll}>
                Clear All
              </button>
            )}
          </div>
        </div>

        {completedTips.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🌱</span>
            <h3>No completed actions yet</h3>
            <p>Start taking action to build your impact journey!</p>
          </div>
        ) : (
          <div className="completed-grid">
            {sortedTips.map(tip => (
              <div key={tip.id} className="completed-card">
                <div className="completed-header-section">
                  <span className="completed-icon">{tip.icon}</span>
                  <div className="completed-meta">
                    <span className="completed-category">{tip.category}</span>
                    <span className="completed-date">{formatDate(tip.completedDate)}</span>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemove(tip.id)}
                    title="Remove action"
                  >
                    ✕
                  </button>
                </div>
                
                <h3 className="completed-title">{tip.title}</h3>
                
                <div className="completed-impact">
                  <span className="impact-badge">📊 {tip.impact}</span>
                </div>
                
                <div className="completed-footer">
                  <span className="completed-difficulty">{tip.difficulty}</span>
                  <span className="completed-points">+{tip.points} pts</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedActions;