import React, { useState, useEffect } from 'react';
import '../styles/LearnAct.css';

const LearnAct = () => {
  const [tips, setTips] = useState([]);
  const [completedTips, setCompletedTips] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [totalPoints, setTotalPoints] = useState(0);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [completedTip, setCompletedTip] = useState(null);

  // Sustainability tips database
  const allTips = [
    {
      id: 1,
      category: 'Energy',
      title: 'Replace light bulbs with LEDs',
      impact: 'Save 30kg CO₂ per year',
      description: 'LED bulbs use 75% less energy and last 25 times longer than incandescent bulbs.',
      points: 50,
      difficulty: 'Easy',
      icon: '💡'
    },
    {
      id: 2,
      category: 'Food',
      title: 'Reduce meat consumption one day a week',
      impact: 'Cut your footprint by 15%',
      description: 'Livestock farming produces 14.5% of global greenhouse gas emissions. One meatless day per week can make a significant difference.',
      points: 75,
      difficulty: 'Medium',
      icon: '🥗'
    },
    {
      id: 3,
      category: 'Transportation',
      title: 'Bike or walk for short trips',
      impact: 'Save 200kg CO₂ per month',
      description: 'For trips under 3km, active transportation eliminates emissions and improves your health.',
      points: 100,
      difficulty: 'Medium',
      icon: '🚴'
    },
    {
      id: 4,
      category: 'Energy',
      title: 'Unplug devices when not in use',
      impact: 'Reduce phantom power by 10%',
      description: 'Devices on standby can account for 10% of your electricity bill. Use power strips for easy unplugging.',
      points: 40,
      difficulty: 'Easy',
      icon: '🔌'
    },
    {
      id: 5,
      category: 'Water',
      title: 'Install a low-flow showerhead',
      impact: 'Save 11,000 liters per year',
      description: 'Low-flow showerheads reduce water usage by up to 50% without sacrificing pressure.',
      points: 60,
      difficulty: 'Easy',
      icon: '🚿'
    },
    {
      id: 6,
      category: 'Waste',
      title: 'Start composting food scraps',
      impact: 'Divert 150kg from landfills yearly',
      description: 'Composting reduces methane emissions from landfills and creates nutrient-rich soil.',
      points: 90,
      difficulty: 'Hard',
      icon: '🌱'
    },
    {
      id: 7,
      category: 'Energy',
      title: 'Lower thermostat by 2°C in winter',
      impact: 'Save 320kg CO₂ per year',
      description: 'Each degree reduction saves about 6% on heating costs and significantly reduces emissions.',
      points: 70,
      difficulty: 'Easy',
      icon: '🌡️'
    },
    {
      id: 8,
      category: 'Waste',
      title: 'Use reusable shopping bags',
      impact: 'Prevent 500 plastic bags annually',
      description: 'Plastic bags take 1000 years to decompose. Keep reusable bags in your car or by the door.',
      points: 45,
      difficulty: 'Easy',
      icon: '🛍️'
    },
    {
      id: 9,
      category: 'Food',
      title: 'Buy local and seasonal produce',
      impact: 'Reduce food miles by 80%',
      description: 'Local seasonal food requires less transportation and storage, cutting emissions significantly.',
      points: 65,
      difficulty: 'Medium',
      icon: '🍎'
    },
    {
      id: 10,
      category: 'Transportation',
      title: 'Carpool to work twice a week',
      impact: 'Save 400kg CO₂ per year',
      description: 'Sharing rides cuts individual emissions in half and reduces traffic congestion.',
      points: 85,
      difficulty: 'Medium',
      icon: '🚗'
    },
    {
      id: 11,
      category: 'Water',
      title: 'Fix leaky faucets promptly',
      impact: 'Save 75 liters per day',
      description: 'A dripping faucet can waste 20 liters per day. Most leaks are easy and cheap to fix.',
      points: 35,
      difficulty: 'Easy',
      icon: '💧'
    },
    {
      id: 12,
      category: 'Energy',
      title: 'Air dry clothes instead of using dryer',
      impact: 'Save 225kg CO₂ per year',
      description: 'Dryers are one of the most energy-intensive appliances. Line drying is free and gentle on fabrics.',
      points: 55,
      difficulty: 'Easy',
      icon: '👕'
    }
  ];

  const categories = ['all', 'Energy', 'Food', 'Transportation', 'Water', 'Waste'];

  useEffect(() => {
    // Load completed tips from localStorage
    const saved = localStorage.getItem('completedTips');
    if (saved) {
      const completed = JSON.parse(saved);
      setCompletedTips(completed);
      const points = completed.reduce((sum, tip) => sum + tip.points, 0);
      setTotalPoints(points);
    }

    // Filter out completed tips
    const savedCompleted = saved ? JSON.parse(saved) : [];
    const completedIds = savedCompleted.map(t => t.id);
    const available = allTips.filter(tip => !completedIds.includes(tip.id));
    setTips(available);
  }, []);

  const filteredTips = selectedCategory === 'all' 
    ? tips 
    : tips.filter(tip => tip.category === selectedCategory);

  const handleComplete = (tip) => {
    const updatedTips = tips.filter(t => t.id !== tip.id);
    const updatedCompleted = [...completedTips, { ...tip, completedDate: new Date().toISOString() }];
    
    setTips(updatedTips);
    setCompletedTips(updatedCompleted);
    setTotalPoints(prev => prev + tip.points);
    
    localStorage.setItem('completedTips', JSON.stringify(updatedCompleted));
    
    setCompletedTip(tip);
    setShowCompletedModal(true);
    
    setTimeout(() => {
      setShowCompletedModal(false);
    }, 3000);
  };

  const getDifficultyColor = (difficulty) => {
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