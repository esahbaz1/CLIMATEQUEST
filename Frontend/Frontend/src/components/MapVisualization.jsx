import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import EcoBotWidget from './EcoBotWidget';

const MissionSimulation = () => {
  const { id } = useParams();
  const [mission, setMission] = useState(null);
  const [impact, setImpact] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/missions/${id}`)
      .then(res => setMission(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleDecision = (value) => {
    setImpact(prev => prev + value);
  };

  if (!mission) return <p>Loading...</p>;

  return (
    <div className="mission-page">
      <h2>{mission.title}</h2>
      <p>{mission.description}</p>
      <div className="decision-buttons">
        {mission.options.map(opt => (
          <button key={opt._id} onClick={() => handleDecision(opt.impact)}>
            {opt.name}
          </button>
        ))}
      </div>
      <p>Current Impact: {impact} % CO₂ reduced</p>
      <EcoBotWidget missionId={id} />
    </div>
  );
};

export default MissionSimulation;
