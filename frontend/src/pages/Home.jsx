import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  const features = [
    { 
      title: "Weather Alerts", 
      desc: "Real-time, location-based weather predictions and farming advisories.", 
      path: "/weather-alerts" 
    },
    { 
      title: "Schemes Updates", 
      desc: "Latest government schemes, subsidies and agricultural policies.", 
      path: "/schemes" 
    },
    { 
      title: "Soil Health Analyzer", 
      desc: "AI-powered soil analysis and personalized recommendations.", 
      path: "/soil-health" 
    },
    { 
      title: "Pest & Disease Prediction", 
      desc: "Early detection from images and actionable advice.", 
      path: "/pest-disease" 
    },
    { 
      title: "Crop Recommendation", 
      desc: "Data-driven crop selection based on soil & market.", 
      path: "/crop-recommendation" 
    },
    { 
      title: "Market Price Tracking", 
      desc: "Live mandi prices, trends, and best selling opportunities.", 
      path: "/market-prices" 
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-inner">
          <h1>Gramin AI</h1>
          <h2>
            <span className="accent">Smart Advisory for</span>
            <br />
            Every Farmer
          </h2>
          <p className="lead">
            Personalized, real-time, multilingual guidance to{" "}
            <span className="accent">boost yields</span> and reduce costs
          </p>

          <div className="hero-ctas">
            <Link to={user ? "/dashboard" : "/login"} className="btn btn-cta">
              Get Started
            </Link>
            <a href="#features" className="btn btn-ghost">Learn More</a>
          </div>

          <div className="quick-features">
            <div className="pill">Weather Alerts</div>
            <div className="pill">Govt Schemes</div>
            <div className="pill">Soil Health</div>
            <div className="pill">Market Prices</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="section-inner">
          <h3>
            Everything You Need for <span className="accent">Smart Farming</span>
          </h3>
          <p className="muted">
            Our AI-powered platform combines weather intelligence, government
            schemes, soil analysis, and market insights to help you make informed
            farming decisions.
          </p>

          <div className="cards">
            {features.map((f, i) => (
              <div className="card" key={i}>
                <div className="card-icon">🌾</div>
                <h4>{f.title}</h4>
                <p className="card-desc">{f.desc}</p>
                <Link className="learn-more" to={f.path}>
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-banner">
        <div className="section-inner">
          <h3>Ready to Transform Your Farming?</h3>
          <p>
            Join thousands of farmers who are already using Gramin AI to increase
            their yields and profits.
          </p>
          <Link to={user ? "/dashboard" : "/login"} className="btn btn-cta white">
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
}
