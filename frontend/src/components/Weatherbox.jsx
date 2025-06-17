import React from 'react';
import './Weatherbox.css';
// WeatherBox.jsx
export default function WeatherBox({ location, weatherData }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Weather Info</h3>
      {weatherData ? (
        <div>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}
