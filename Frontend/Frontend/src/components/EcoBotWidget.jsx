import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Leaf, Lightbulb, HelpCircle, Sparkles } from 'lucide-react';
import '../styles/EcoBotChat.css';

const API_BASE =
  process.env.NODE_ENV === 'production'
    ? 'https://tvoj-backend-na-renderu.onrender.com'
    : 'http://localhost:3000';

const EcoBotChat = () => {
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: "Hi! I'm EcoBot 🌱 Your personal climate assistant. Ask me anything about climate change, sustainability, or carbon emissions!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulacija AI odgovora (zamijeni sa pravim API pozivom)
  const getAIResponse = async (userMessage) => {
  const res = await fetch(`${API_BASE}/api/ecobot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage })
  });
  const data = await res.json();
  return data.reply;
};


  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { 
      sender: 'user', 
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulacija čekanja (kao da AI razmišlja)
    setTimeout(async () => {
      try {
        // Ovdje možeš zamijeniti sa pravim API pozivom:
        // const res = await axios.post('http://localhost:5000/api/ecobot', { message: input });
        // const botReply = res.data.reply;
        
        const botReply = await getAIResponse(input);
        
        const botMsg = { 
          sender: 'bot', 
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
      } catch (err) {
        console.log(err);
        const errorMsg = {
          sender: 'bot',
          text: "Sorry, I'm having trouble connecting. Please try again! 😔",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, errorMsg]);
        setIsTyping(false);
      }
    }, 1000);
  };

  const quickQuestions = [
    { icon: <HelpCircle size={16} />, text: "What is carbon neutrality?" },
    { icon: <Leaf size={16} />, text: "How does tree planting reduce emissions?" },
    { icon: <Lightbulb size={16} />, text: "Tell me about renewable energy" },
    { icon: <Sparkles size={16} />, text: "Give me a quiz!" }
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
  };

  return (
    <div className="ecobot-container">
      <div className="ecobot-chat">
        {/* Header */}
        <div className="chat-header">
          <div className="header-content">
            <div className="bot-avatar">
              <Bot size={24} />
            </div>
            <div className="header-info">
              <h1>EcoBot</h1>
              <p className="status">
                <span className="status-dot"></span>
                Online - Ready to help!
              </p>
            </div>
          </div>
          <div className="header-icon">
            🌍
          </div>
        </div>

        {/* Quick Questions */}
        <div className="quick-questions">
          <p className="quick-title">Quick questions:</p>
          <div className="quick-buttons">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                className="quick-btn"
                onClick={() => handleQuickQuestion(q.text)}
              >
                {q.icon}
                <span>{q.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="messages-container">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message ${msg.sender === 'bot' ? 'bot-message' : 'user-message'}`}
            >
              <div className="message-avatar">
                {msg.sender === 'bot' ? (
                  <div className="avatar bot-avatar-small">
                    <Bot size={20} />
                  </div>
                ) : (
                  <div className="avatar user-avatar-small">
                    <User size={20} />
                  </div>
                )}
              </div>
              <div className="message-content">
                <div className="message-bubble">
                  <p>{msg.text}</p>
                </div>
                <span className="message-time">{msg.timestamp}</span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot-message">
              <div className="message-avatar">
                <div className="avatar bot-avatar-small">
                  <Bot size={20} />
                </div>
              </div>
              <div className="message-content">
                <div className="message-bubble typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input-container">
          <div className="input-wrapper">
            <input
              type="text"
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me about climate change..."
            />
            <button
              className="send-button"
              onClick={sendMessage}
              disabled={!input.trim()}
            >
              <Send size={20} />
            </button>
          </div>
          <p className="input-hint">
            💡 Tip: Try asking about carbon footprint, renewable energy, or request a quiz!
          </p>
        </div>
      </div>
    </div>
  );
};

export default EcoBotChat;
