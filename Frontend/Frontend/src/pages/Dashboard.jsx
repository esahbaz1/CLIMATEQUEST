import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MissionCard from '../components/MissionCard';


const Dashboard = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/missions')
      .then(res => setMissions(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="dashboard">
      <h2>Choose Your Mission 🌱</h2>
      <div className="missions-grid">
        {missions.map(mission => (
          <MissionCard key={mission._id} mission={mission} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
