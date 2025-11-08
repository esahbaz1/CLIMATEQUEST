import React from 'react';


const BadgeCard = ({ badge }) => {
  return (
    <div className="badge-card">
      <img src={badge.icon} alt={badge.name} />
      <h4>{badge.name}</h4>
      <p>{badge.description}</p>
    </div>
  );
};

export default BadgeCard;
