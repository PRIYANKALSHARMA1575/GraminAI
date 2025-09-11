import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <div className="logo-circle">G</div>
          <span className="brand-text">Gramin AI</span>
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>

          {user ? (
            <>
              <Link to="/dashboard" className="btn small">Dashboard</Link>
              <button onClick={logout} className="btn-ghost">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">Start Your Journey</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
