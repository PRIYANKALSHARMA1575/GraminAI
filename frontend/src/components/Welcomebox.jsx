import React from 'react';
import './BoxCommon.css';

export default function Welcomebox({ userName }) {
  return (
    <div className="welcome-header">
      <h2>Welcome to Ramin AI, {userName} 👋</h2>
      <div className="chatbot-icon">🤖</div>
    </div>
  );
}
