import React from "react";

export default function PestDetection() {
  return (
    <div className="page-container">
      <h1 className="page-title">🐛 Pest & Disease Detection</h1>
      <p className="page-subtitle">
        Detect crop pests and diseases early with AI-powered image analysis.
      </p>
      <div className="card" style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
        <input type="file" className="input" />
        <br /><br />
        <button className="btn">Upload & Detect</button>
        <p style={{ marginTop: "15px", color: "#555" }}>
          Upload a crop leaf image to identify diseases instantly.
        </p>
      </div>
    </div>
  );
}
