import React, { useState } from "react";
import axios from "axios";

const EcoBotChat = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm EcoBot. Ask me anything about climate." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/ecobot", { message: input });
      setMessages((prev) => [...prev, { sender: "bot", text: res.data.reply }]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col p-8 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">EcoBot Chat</h1>
      <div className="flex-1 bg-white p-4 rounded shadow overflow-y-auto mb-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 p-2 rounded ${
              m.sender === "bot" ? "bg-green-100 text-green-900 self-start" : "bg-green-500 text-white self-end"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-green-500 text-white px-4 rounded-r hover:bg-green-600 transition"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default EcoBotChat;
