// File: components/ChatbotBox.jsx
import React, { useState } from 'react';
import './ChatbotBox.css';
import { sendMessageToGemini } from './gemini.js'; // ✅ FIXED

export default function ChatbotBox() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const userMsg = { role: 'user', content: prompt };
    setMessages(prev => [...prev, userMsg]);

    try {
      const response = await sendMessageToGemini(prompt); // ✅ FIXED
      const botMsg = { role: 'bot', content: response };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('Error:', err);
    }

    setPrompt('');
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask something..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>➤</button>
      </div>
    </div>
  );
}
