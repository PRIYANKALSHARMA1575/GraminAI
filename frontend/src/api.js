// frontend/src/api.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Helper to attach/remove token globally
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// 🌦️ Current weather by city
export const getCurrentWeather = async (city) => {
  const response = await api.get(`/weather`, {
    params: {
      q: city,
      units: "metric",
      appid: import.meta.env.VITE_WEATHER_API_KEY,
    },
  });
  return response.data;
};

// 🌦️ Weather forecast (next 5 intervals)
export const getWeatherForecast = async (city) => {
  const response = await api.get(`/forecast`, {
    params: {
      q: city,
      units: "metric",
      cnt: 5,
      appid: import.meta.env.VITE_WEATHER_API_KEY,
    },
  });
  return response.data;
};

export default api;
