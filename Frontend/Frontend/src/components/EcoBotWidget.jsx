import React, { useState } from 'react';
import axios from 'axios';


const EcoBotWidget = ({ missionId }) => {
  const [messages, setMessages] = useState([{ text: 'Hello! I am EcoBot 🤖', type: 'bot' }]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input) return;
    setMessages(prev => [...prev, { text: input, type: 'user' }]);
    const res = await axios.post('http://localhost:5000/api/ecobot', { missionId, message: input });
    setMessages(prev => [...prev, { text: res.data.reply, type: 'bot' }]);
    setInput('');
  };

  return (
    <div className="ecobot-widget">
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <p key={idx} className={msg.type}>{msg.text}</p>
        ))}
      </div>
      <div className="input-box">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask EcoBot..." />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default EcoBotWidget;
