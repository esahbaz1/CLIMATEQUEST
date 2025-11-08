import React, { useEffect, useState } from 'react';
import axios from 'axios';


const LearnAct = () => {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/actions')
      .then(res => setActions(res.data))
      .catch(err => console.log(err));
  }, []);

  const toggleComplete = (id) => {
    setActions(actions.map(a => a._id === id ? { ...a, done: !a.done } : a));
  };

  return (
    <div className="learn-act-page">
      <h2>💡 Learn & Act</h2>
      <ul>
        {actions.map(a => (
          <li key={a._id} className={a.done ? 'done' : ''} onClick={() => toggleComplete(a._id)}>
            {a.name} - {a.effect} CO₂ saved
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LearnAct;
