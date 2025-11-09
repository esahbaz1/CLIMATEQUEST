import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Leaf, Lightbulb, HelpCircle, Sparkles } from 'lucide-react';
import '../styles/EcoBotChat.css';

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
    const lowerMsg = userMessage.toLowerCase();
    
    // Primjeri odgovora za različita pitanja
    if (lowerMsg.includes('carbon neutrality') || lowerMsg.includes('carbon neutral')) {
      return "Carbon neutrality means achieving a balance between carbon emissions and carbon removal from the atmosphere. This can be done by reducing emissions and offsetting remaining emissions through methods like tree planting or carbon capture. 🌍";
    } else if (lowerMsg.includes('tree planting') || lowerMsg.includes('trees reduce')) {
      return "Correct! Planting 10 trees can offset approximately 20kg of CO₂ annually. Trees absorb CO₂ through photosynthesis and store carbon in their wood, leaves, and soil. A mature tree can absorb up to 22kg of CO₂ per year! 🌳";
    } else if (lowerMsg.includes('renewable energy') || lowerMsg.includes('solar') || lowerMsg.includes('wind')) {
      return "Renewable energy sources like solar and wind power produce electricity without emitting greenhouse gases. Solar panels convert sunlight to electricity, while wind turbines use wind energy. Both are key to reducing our carbon footprint! ☀️💨";
    } else if (lowerMsg.includes('greenhouse gas') || lowerMsg.includes('ghg')) {
      return "Greenhouse gases (GHGs) trap heat in Earth's atmosphere, causing global warming. The main GHGs are CO₂, methane (CH₄), and nitrous oxide (N₂O). CO₂ from burning fossil fuels is the largest contributor. 🏭";
    } else if (lowerMsg.includes('climate change') || lowerMsg.includes('global warming')) {
      return "Climate change refers to long-term shifts in temperatures and weather patterns. Since the 1800s, human activities have been the main driver, primarily due to burning fossil fuels like coal, oil, and gas. This produces heat-trapping greenhouse gases. 🌡️";
    } else if (lowerMsg.includes('reduce emissions') || lowerMsg.includes('lower carbon')) {
      return "You can reduce your carbon footprint by: using public transport 🚌, eating less meat 🥗, choosing renewable energy ⚡, reducing waste ♻️, and supporting sustainable products. Every small action counts! 💚";
    } else if (lowerMsg.includes('quiz') || lowerMsg.includes('test')) {
      return "Let's test your knowledge! ❓ Question: How many trees does it take to offset 1 ton of CO₂ per year? A) 10 trees B) 50 trees C) 100 trees D) 500 trees. Reply with A, B, C, or D!";
    } else if (lowerMsg === 'b' || lowerMsg === 'b)') {
      return "Correct! 🎉 Approximately 50 mature trees can offset 1 ton of CO₂ per year. You're becoming a climate expert! Want another quiz question?";
    } else if (lowerMsg === 'a' || lowerMsg === 'c' || lowerMsg === 'd') {
      return "Not quite! The correct answer is B) 50 trees. 🌳 Each mature tree absorbs about 20kg of CO₂ annually, so you need around 50 trees to offset 1 ton. Keep learning!";
    } else {
      return "That's a great question! While I don't have specific information on that topic yet, I can help you with questions about carbon neutrality, tree planting, renewable energy, greenhouse gases, and climate change. What would you like to know? 🤔";
    }
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
