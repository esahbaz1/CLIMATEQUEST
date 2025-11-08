import React from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">🌍 ClimateQuest</h1>
      <ul className="nav-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/levels">Levels</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/learn-act">Learn & Act</Link></li>
        <li><Link to="/data-visualization">Data</Link></li>
        <li><Link to="/ecobot">EcoBot</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
