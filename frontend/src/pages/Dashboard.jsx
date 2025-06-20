import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Navbar from '../components/Navbar';
import { getUserProfile } from '../api';

import WeatherBox from '../components/Weatherbox'; 
import WelcomeBox from '../components/Welcomebox'; // Assuming you have a WelcomeBox component
import MarketPriceBox from '../components/MarketPricebox'; // Assuming you have a MarketPrice component
import CropRecommendationBox from '../components/CropRecommendationbox'; // Assuming you have a CropRecommendation component
import PestIdentificationBox from '../components/PestIdentificationbox'; // Assuming you have a PestIdentification component
import DiseaseIdentificationBox from '../components/DiseaseIdentificationbox'; // Assuming you have a DiseaseIdentification component
import ChatbotBox from '../components/Chatbotbox'; // Assuming you have a Chatbot component
import CropSchemesBox from '../components/CropSchemesbox'; // Assuming you have a CropSchemes component


export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const [hasRequestedLocation, setHasRequestedLocation] = useState(false); // track if user clicked

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

  
  }, []);
const requestLocation = () => {
  console.log('Button clicked — requesting location...');
  setHasRequestedLocation(true);
  setLocationError(false);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        console.log('Got coords:', pos.coords); // check this too
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });
        fetchWeather(latitude, longitude);
      },
      err => {
        console.error('Location access denied:', err);
        setLocationError(true);
      }
    );
  } else {
    setLocationError(true);
  }
};


  const fetchWeather = async (lat, lon) => {
  try {
    const apiKey = '17a7024458e9f7e9f7b45df92d0a868b';
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Weather data:', data); // ← Check this log
    setWeatherData(data);
  } catch (err) {
    console.error('Error fetching weather data:', err);
  }
};

  

 return (
    <div className="dashboard-layout">
      <div className="navbar"><Navbar userName={userName} /></div>
      <div className="dashboard-content">
        <div className="dashboard-grid">
          <div className="welcome"><WelcomeBox userName={userName} /></div>
          <div className="weather">
            <WeatherBox
              location={location}
              weatherData={weatherData}
              locationError={locationError}
              onRequestLocation={requestLocation}
            />
          </div>
          {/* other boxes */}
          <div className="scheme"><CropSchemesBox /></div>
          <div className="crop"><CropRecommendationBox /></div>
          <div className="market"><MarketPriceBox /></div>
          <div className="disease"><DiseaseIdentificationBox /></div>
          <div className="pest"><PestIdentificationBox /></div>
          <div className="chatbot"><ChatbotBox /></div>
        </div>
      </div>
    </div>
  );
}
