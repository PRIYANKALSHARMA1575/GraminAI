import React from 'react';
import './Weatherbox.css';

export default function WeatherBox({ weatherData, locationError, hasRequestedLocation, onRequestLocation }) {
  return (
    <div className="weather-box-container p-4 border rounded shadow-md">
      <h3 className="text-lg font-bold mb-2">Weather Info</h3>

      {/* Step 1: User hasn't clicked the button yet */}
      {!hasRequestedLocation && (
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={onRequestLocation}
        >
          Allow Location Access
        </button>
      )}

      {/* Step 2: User clicked, data is loading */}
      {hasRequestedLocation && !weatherData && !locationError && (
        <p>Loading weather data...</p>
      )}

      {/* Step 3: User denied access or there was an error */}
      {locationError && (
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={onRequestLocation}
        >
          Allow Location Again
        </button>
      )}

      {/* Step 4: Weather data successfully fetched */}
      {weatherData && (
        <div className="weather-info mt-2">
          <p><strong>Temperature:</strong> {weatherData.main.temp}°C</p>
          <p><strong>Weather:</strong> {weatherData.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
          <p><strong>Location:</strong> {weatherData.name}</p>
        </div>
      )}
    </div>
  );
}
