import React from "react";

export default function SoilHealth() {
  return (
    <div className="page-container">
      <h1 className="page-title">🌱 Soil Health Analyzer</h1>
      <p className="page-subtitle">
        AI-powered analysis to help you understand and improve soil fertility.
      </p>
      <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <form className="form">
          <input className="input" placeholder="Soil pH level" />
          <input className="input" placeholder="Nitrogen (N) level" />
          <input className="input" placeholder="Phosphorus (P) level" />
          <input className="input" placeholder="Potassium (K) level" />
          <button className="btn">Analyze</button>
        </form>
      </div>
    </div>
  );
}
