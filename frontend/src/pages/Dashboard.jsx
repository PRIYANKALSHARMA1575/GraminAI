import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getUserProfile } from '../api';

export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const [location, setLocation] = useState(null);

  useEffect(() => {
     const email = localStorage.getItem('userEmail');
  console.log("Email from localStorage:", email);

  if (email) {
   getUserProfile(email)
  .then(data => {
    setUserName(data.Name); 
  })
      .catch(err => {
        console.error("Error fetching user profile:", err);
      });
  }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          setLocation({ latitude, longitude });
        },
        err => {
          console.error('Location access denied:', err);
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Left Navbar */}
      <Navbar userName={userName} />

      {/* Main content with left padding to make space for navbar */}
      <div className="pl-[260px] p-6">
        <h1 className="text-3xl font-bold mb-6 text-green-800">
          👋 Welcome {userName}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-xl p-4">☁️ Weather Summary</div>
          <div className="bg-white shadow-lg rounded-xl p-4">🌾 Crop Recommendation</div>
          <div className="bg-white shadow-lg rounded-xl p-4">📸 Upload Pest Image</div>
          <div className="bg-white shadow-lg rounded-xl p-4">🩺 Identify Plant Disease</div>
          <div className="bg-white shadow-lg rounded-xl p-4">📈 Market Price</div>
          <div className="bg-white shadow-lg rounded-xl p-4">🏛️ Government Schemes</div>
          <div className="bg-white shadow-lg rounded-xl p-4">🎤 Voice Assistant</div>
          <div className="bg-white shadow-lg rounded-xl p-4">📚 Personal Summary</div>
        </div>
      </div>
    </div>
  );
}
