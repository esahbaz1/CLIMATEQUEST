import React from 'react';
import { Link } from 'react-router-dom';


const MissionCard = ({ mission }) => {
  return (
    <div className="mission-card">
      <h3>{mission.title}</h3>
      <p>{mission.description}</p>
      <p>CO₂ Goal: {mission.co2Target} tons</p>
      <Link to={`/mission/${mission._id}`} className="start-btn">Start Mission</Link>
    </div>
  );
};

export default MissionCard;
