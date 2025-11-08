import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/leaderboard')
      .then(res => setLeaders(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="leaderboard-page">
      <h2>🌎 Global Leaderboard</h2>
      <ol>
        {leaders.map((user, idx) => (
          <li key={user._id}>
            {idx + 1}. {user.name} - {user.points} pts
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
