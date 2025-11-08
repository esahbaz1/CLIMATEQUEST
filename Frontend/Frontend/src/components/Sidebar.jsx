import React from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Link to="/dashboard">🏠 Dashboard</Link>
      <Link to="/missions">🎯 Missions</Link>
      <Link to="/community-challenges">🤝 Community</Link>
      <Link to="/learn-act">💡 Learn & Act</Link>
      <Link to="/levels">🏆 Levels</Link>
      <Link to="/leaderboard">📊 Leaderboard</Link>
    </aside>
  );
};

export default Sidebar;
