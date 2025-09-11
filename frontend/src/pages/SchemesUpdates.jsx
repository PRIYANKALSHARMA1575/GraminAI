import React from "react";
import "./SchemesUpdates.css";

const alerts = [
  {
    title: "Weather Alert – Heavy Rain Warning",
    date: "6th September 2025",
    description:
      "Heavy rain expected in Chennai for the next 24 hours. Farmers are advised to secure standing crops and avoid irrigation during heavy downpour.",
  },
  {
    title: "Government Subsidy – Fertilizer Support",
    description:
      "Tamil Nadu Fertilizer Subsidy Program: Up to ₹5,000 per acre for registered farmers purchasing fertilizers. Apply at local agriculture offices or online via TN Agriculture portal.",
  },
  {
    title: "Crop Insurance Update – PMFBY",
    description:
      "Farmers in Chennai are encouraged to register for crop insurance before 15th September to cover potential losses due to unpredictable weather.",
  },
  {
    title: "Pest & Disease Advisory – Rice & Banana",
    description:
      "Spray recommended fungicide on affected crops and monitor for fungal infection. Avoid overwatering during forecasted rains.",
  },
  {
    title: "Soil Health Card Update",
    description:
      "Farmers with pending soil health tests can now submit samples at local agriculture centers for accurate fertilizer recommendations.",
  },
  {
    title: "New Smart Farming Initiative",
    description:
      "Gramin AI Smart Advisory – Chennai Pilot. Free AI-based crop advisory, pest detection via mobile photo upload, and weather-based irrigation recommendations.",
  },
];

export default function SchemesUpdates() {
  return (
    <div className="schemes-container">
      <h1 className="schemes-title">🌱 Chennai Farmer Alerts & Schemes</h1>
      <div className="schemes-list">
        {alerts.map((alert, index) => (
          <div key={index} className="alert-card">
            <h3>{alert.title}</h3>
            {alert.date && <p className="alert-date">📅 {alert.date}</p>}
            <p>{alert.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
