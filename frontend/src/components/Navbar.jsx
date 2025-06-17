import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Contains styles (see next section)

export default function Navbar({ userName }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/logout');
  };

  return (
    <div className="navbar">
      {/* ✅ USER NAME AT TOP */}
      <div className="username-display mb-6">
        👤 <strong>{userName || 'Loading...'}</strong>
      </div>
      <br>
      </br>
      <br>
      </br>
      <div className="navbar-buttons">
        <button onClick={() => navigate('/dashboard')}>📊 Dashboard</button>
        <button onClick={() => navigate('/chatbot')}>🤖 Chatbot</button>
        <button onClick={() => navigate('/crop-recommendation')}>🌾 Crop Recommendation</button>
        <button onClick={() => navigate('/pest-identification')}>🐛 Pest Identification</button>
        <button onClick={() => navigate('/Disease-Identification')}>🩺 Disease Identification</button>
        <button onClick={() => navigate('/schemes')}>🏛️ Schemes</button>
        <button onClick={() => navigate('/profile')}>👤 Profile</button>
        <button onClick={() => navigate('/help')}>❓ Help</button>
      </div>

        <button className="logout-button" onClick={handleLogout}>Logout</button>
      
    </div>
  );
}
