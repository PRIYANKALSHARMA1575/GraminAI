import React from "react";

export default function CropRecommendation() {
  return (
    <div className="page-container">
      <h1 className="page-title">🌾 Crop Recommendation</h1>
      <p className="page-subtitle">
        Get AI-driven suggestions on the best crops based on your soil & market conditions.
      </p>
      <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <form className="form">
          <input className="input" placeholder="Soil Type" />
          <input className="input" placeholder="Water Availability" />
          <input className="input" placeholder="Region/State" />
          <button className="btn">Get Recommendations</button>
        </form>
      </div>
    </div>
  );
}
