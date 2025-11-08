import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Arrow Toggle Button */}
      <button 
        className={`sidebar-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {isOpen ? '◀' : '▶'}
      </button>

      {/* Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <Link to="/dashboard" onClick={closeSidebar}>🏠 Dashboard</Link>
        <Link to="/missions" onClick={closeSidebar}>🎯 Missions</Link>
        <Link to="/community-challenges" onClick={closeSidebar}>🤝 Community</Link>
        <Link to="/learn-act" onClick={closeSidebar}>💡 Learn & Act</Link>
        <Link to="/levels" onClick={closeSidebar}>🏆 Levels</Link>
        <Link to="/leaderboard" onClick={closeSidebar}>📊 Leaderboard</Link>
      </aside>
    </>
  );
};

export default Sidebar;