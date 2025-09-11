import React from "react";

export default function MarketPrices() {
  const crops = [
    { crop: "Wheat", price: "₹2200/quintal", trend: "↑ Rising" },
    { crop: "Rice", price: "₹1800/quintal", trend: "→ Stable" },
    { crop: "Cotton", price: "₹6200/quintal", trend: "↓ Falling" },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">💹 Market Price Tracking</h1>
      <p className="page-subtitle">
        Stay ahead with live mandi prices, trends, and best-selling opportunities.
      </p>
      <div className="grid grid-3">
        {crops.map((item, idx) => (
          <div className="card" key={idx}>
            <h2>{item.crop}</h2>
            <p>{item.price}</p>
            <strong>{item.trend}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
