import React, { useEffect, useState } from 'react';
import axios from 'axios';


const CommunityChallenges = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/challenges')
      .then(res => setChallenges(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="community-challenges-page">
      <h2>🤝 Community Challenges</h2>
      <ul>
        {challenges.map(c => (
          <li key={c._id}>
            {c.title} - Progress: {c.progress}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityChallenges;
