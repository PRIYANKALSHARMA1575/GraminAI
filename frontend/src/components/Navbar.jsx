import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ userName }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // remove email or token
    navigate('/login');
  };

  return (
    <nav className="bg-green-700 text-white px-4 py-3 shadow-md flex justify-between items-center">
      <div className="text-xl font-bold cursor-pointer" onClick={() => navigate('/dashboard')}>
        🌾 Gramin AI
      </div>
      <div className="hidden md:flex space-x-4 items-center">
        <button onClick={() => navigate('/dashboard')} className="hover:underline">Dashboard</button>
        <button onClick={() => navigate('/profile')} className="hover:underline">Profile</button>
        <button onClick={() => navigate('/help')} className="hover:underline">Help</button>
        {userName && (
          <span className="text-sm font-medium">👤 {userName}</span>
        )}
        <button onClick={handleLogout} className="bg-white text-green-700 px-3 py-1 rounded-md hover:bg-gray-100">
          Logout
        </button>
      </div>
    </nav>
  );
}
