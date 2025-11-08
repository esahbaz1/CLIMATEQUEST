import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BadgeCard from '../components/BadgeCard';


const LevelsRewards = () => {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/me/badges')
      .then(res => setBadges(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="levels-page">
      <h2>🏆 Your Achievements</h2>
      <div className="badges-grid">
        {badges.map(b => <BadgeCard key={b._id} badge={b} />)}
      </div>
    </div>
  );
};

export default LevelsRewards;
