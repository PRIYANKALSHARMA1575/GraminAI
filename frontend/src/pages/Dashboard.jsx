import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { getUserProfile } from '../api'; // Assume it calls /users/profile/:email

export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const [location, setLocation] = useState(null);

  useEffect(() => {
  const email = localStorage.getItem('userEmail');
  if (email) {
    getUserProfile(email)
      .then(data => {
        setUserName(data.Name); // ✅ Use directly
      })
      .catch(err => {
        console.error("Error fetching user profile:", err);
      });
  }

    // Ask for location
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
      <Navbar  userName={userName}/>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          👋 Welcome {userName}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white shadow-md rounded-xl p-4">☁️ Weather Summary</div>
          <div className="bg-white shadow-md rounded-xl p-4">🌾 Crop Recommendation</div>
          <div className="bg-white shadow-md rounded-xl p-4">📸 Upload Pest Image</div>
          <div className="bg-white shadow-md rounded-xl p-4">🩺 Identify Plant Disease</div>
          <div className="bg-white shadow-md rounded-xl p-4">📈 Market Price</div>
          <div className="bg-white shadow-md rounded-xl p-4">🏛️ Government Schemes</div>
          <div className="bg-white shadow-md rounded-xl p-4">🎤 Voice Assistant</div>
          <div className="bg-white shadow-md rounded-xl p-4">📚 Personal Summary</div>
        </div>
      </div>
    </div>
  );
}