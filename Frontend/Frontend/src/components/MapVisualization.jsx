import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import EcoBotWidget from './EcoBotWidget';

const MissionSimulation = () => {
  const { id } = useParams();
  const [mission, setMission] = useState(null);
  const [impact, setImpact] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Promijeni URL na svoj deploy backend kad bude online
    axios.get(`http://localhost:5000/api/missions/${id}`)
      .then(res => setMission(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDecision = (option) => {
    setImpact(prev => prev + option.impact);
    setSelectedOption(option.name);
  };

  if (!mission) return <p>Loading mission...</p>;

  return (
    <div className="mission-page" style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h2>{mission.title}</h2>
      <p>{mission.description}</p>

      <div className="decision-buttons" style={{ margin: '1rem 0' }}>
        {mission.options.map(opt => (
          <button
            key={opt._id}
            onClick={() => handleDecision(opt)}
            style={{
              display: 'block',
              margin: '0.5rem 0',
              padding: '0.5rem 1rem',
              backgroundColor: selectedOption === opt.name ? '#4caf50' : '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {opt.name} ({opt.impact}% CO₂)
          </button>
        ))}
      </div>

      <p><strong>Selected option:</strong> {selectedOption || 'None'}</p>
      <p><strong>Current Impact:</strong> {impact} % CO₂ reduced</p>

      <EcoBotWidget missionId={id} />
    </div>
  );
};

export default MissionSimulation;
