import React from 'react';
import './BoxCommon.css';
import { useNavigate } from 'react-router-dom'; // ✅ Corrected spelling

export default function Welcomebox({ userName }) {
  const navigate = useNavigate();

  const goToChatbot = () => {
    navigate('/chatbot');
  };

  return (
    <div className="welcome-header">
      <h2>Welcome to GraminAI, {userName} 👋</h2>
      <div className="chatbot-icon" onClick={goToChatbot} style={{ cursor: 'pointer' }}>
        🤖
      </div>
    </div>
  );
}
