import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="dashboard">
      <div className="section-inner">
        <h2>Welcome, {user?.name || "Farmer"}</h2>
        <p className="muted">This is your dashboard. From here you can access features like Weather, Soil Analysis, Pest Detection and Market Prices.</p>

        <div className="grid-3">
          <div className="dash-card">Weather Alerts</div>
          <div className="dash-card">Soil Health</div>
          <div className="dash-card">Market Prices</div>
        </div>

        <div style={{ marginTop: 20 }}>
          <button className="btn-ghost" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
