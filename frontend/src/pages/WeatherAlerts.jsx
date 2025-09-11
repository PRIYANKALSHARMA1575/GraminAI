import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WeatherAlerts.css";

export default function WeatherAlerts() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to fetch weather using Open-Meteo
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode`
      );

      setWeather({
        city: `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`,
        temperature: res.data.current_weather.temperature,
        windSpeed: res.data.current_weather.windspeed,
        weatherCode: res.data.current_weather.weathercode,
        forecast: res.data.hourly,
      });
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  // Map Open-Meteo weather codes to readable description
  const getWeatherDescription = (code) => {
    const map = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      61: "Light rain",
      63: "Moderate rain",
      65: "Heavy rain",
      71: "Light snow",
      73: "Moderate snow",
      75: "Heavy snow",
      80: "Light rain showers",
      81: "Moderate rain showers",
      82: "Heavy rain showers",
      95: "Thunderstorm",
      99: "Thunderstorm with hail",
    };
    return map[code] || "Unknown";
  };

  useEffect(() => {
    // Get live location from browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          console.warn("Location denied, using fallback:", err);
          // Fallback to Delhi
          fetchWeatherByCoords(28.6139, 77.209);
        }
      );
    } else {
      console.warn("Geolocation not supported, using fallback");
      fetchWeatherByCoords(28.6139, 77.209);
    }
  }, []);

  return (
    <div className="weather-container">
      <h1 className="title">🌾 Live Weather Alerts for Farmers</h1>

      {loading && <p className="loading">Fetching weather data...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.city}</h2>
          <p>🌡 Temperature: {weather.temperature}°C</p>
          <p>☁ Condition: {getWeatherDescription(weather.weatherCode)}</p>
          <p>💨 Wind Speed: {weather.windSpeed} m/s</p>
        </div>
      )}

      {weather?.forecast && (
        <div className="forecast">
          <h3>📅 Hourly Forecast (next 5 hours)</h3>
          <div className="forecast-list">
            {weather.forecast.temperature_2m.slice(0, 5).map((temp, i) => (
              <div key={i} className="forecast-card">
                <p>{i + 1}h later</p>
                <p>{temp}°C</p>
                <p>{getWeatherDescription(weather.forecast.weathercode[i])}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
