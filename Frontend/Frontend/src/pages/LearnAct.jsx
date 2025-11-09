import React, { useState, useEffect } from 'react';
import '../styles/LearnAct.css';

const LearnAct = () => {
  const [tips, setTips] = useState([]);
  const [completedTips, setCompletedTips] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [totalPoints, setTotalPoints] = useState(0);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [completedTip, setCompletedTip] = useState(null);

  // 🔹 Dohvati userId iz localStorage
  const userId = localStorage.getItem('userId');

  const categories = ['all', 'Energy', 'Food', 'Transportation', 'Water', 'Waste'];
  const API_BASE =
    process.env.NODE_ENV === 'production'
      ? 'https://tvoj-backend-na-renderu.onrender.com'
      : 'http://localhost:3000';

  useEffect(() => {
    const fetchTips = async () => {
      try {
        // 🔹 Dohvati sve tipove iz backend API-ja
        const res = await fetch(`${API_BASE}/api/tips`);// promijeni URL
        const tipsData = await res.json();

        // 🔹 Dohvati završene tipove za usera iz localStorage
        const savedCompleted = localStorage.getItem('completedTips');
        const completedData = savedCompleted ? JSON.parse(savedCompleted) : [];
        const completedIds = completedData.map(t => t._id);

        // 🔹 Filtriraj dostupne tipove
        const availableTips = tipsData.filter(t => !completedIds.includes(t._id));

        setTips(availableTips);
        setCompletedTips(completedData);

        // 🔹 Izračunaj ukupne bodove
        const total = completedData.reduce((sum, t) => sum + t.points, 0);
        setTotalPoints(total);
      } catch (err) {
        console.error('❌ Error fetching tips:', err);
      }
    };

    if (userId) fetchTips(); // samo ako postoji userId
  }, [userId]);

  const filteredTips = selectedCategory === 'all'
    ? tips
    : tips.filter(tip => tip.category === selectedCategory);

  const handleComplete = (tip) => {
    const updatedTips = tips.filter(t => t._id !== tip._id);
    const updatedCompleted = [...completedTips, { ...tip, completedDate: new Date().toISOString() }];

    setTips(updatedTips);
    setCompletedTips(updatedCompleted);
    setTotalPoints(prev => prev + tip.points);

    // 🔹 Spremi u localStorage
    localStorage.setItem('completedTips', JSON.stringify(updatedCompleted));

    // 🔹 Pošalji info backendu da je korisnik završio tip (ako želiš)
    // fetch('https://tvoj-backend-url.onrender.com/api/tips/complete', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ userId, tipId: tip._id }),
    // });

    setCompletedTip(tip);
    setShowCompletedModal(true);
    setTimeout(() => setShowCompletedModal(false), 3000);
  };  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="learnact-container">
      <div className="learnact-header">
        <div className="header-content">
          <h1>Learn & Act</h1>
          <p>Take action with data-backed sustainability tips</p>
        </div>
        <div className="points-badge">
          <span className="points-icon">⭐</span>
          <div className="points-info">
            <span className="points-value">{totalPoints}</span>
            <span className="points-label">Impact Points</span>
          </div>
        </div>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <span className="stat-value">{completedTips.length}</span>
            <span className="stat-label">Actions Completed</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <span className="stat-value">{tips.length}</span>
            <span className="stat-label">Available Actions</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🌍</div>
          <div className="stat-content">
            <span className="stat-value">{Math.round(totalPoints * 0.5)}kg</span>
            <span className="stat-label">CO₂ Saved</span>
          </div>
        </div>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="tips-grid">
        {filteredTips.map(tip => (
          <div key={tip.id} className="tip-card">
            <div className="tip-header">
              <span className="tip-icon">{tip.icon}</span>
              <span className="tip-category">{tip.category}</span>
            </div>
            
            <h3 className="tip-title">{tip.title}</h3>
            
            <div className="tip-impact">
              <span className="impact-icon">📊</span>
              <span>{tip.impact}</span>
            </div>
            
            <p className="tip-description">{tip.description}</p>
            
            <div className="tip-footer">
              <div className="tip-meta">
                <span 
                  className="difficulty-badge" 
                  style={{ backgroundColor: getDifficultyColor(tip.difficulty) }}
                >
                  {tip.difficulty}
                </span>
                <span className="points-value">+{tip.points} pts</span>
              </div>
              
              <button 
                className="complete-btn"
                onClick={() => handleComplete(tip)}
              >
                Mark Complete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTips.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">🎉</span>
          <h3>All caught up!</h3>
          <p>You've completed all available tips in this category. Check back later for more!</p>
        </div>
      )}

      {showCompletedModal && completedTip && (
        <div className="completion-modal">
          <div className="modal-content">
            <span className="modal-icon">🎉</span>
            <h3>Action Completed!</h3>
            <p>You earned <strong>{completedTip.points} points</strong></p>
            <div className="modal-impact">{completedTip.impact}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnAct;