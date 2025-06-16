import React from "react";
import "./Login.css";
import LoginBox from "../components/Loginbox"; // Update the path based on your folder
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api"; // Make sure loginUser is correctly implemented

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
  try {
    const { user } = await loginUser(email, password);

    localStorage.setItem("userEmail", user.Email); // Store email for dashboard/profile use

    alert("Login successful");
    navigate("/dashboard");
  } catch (err) {
    console.error("Login error:", err.message);
    alert("Login failed");
  }
};



  return (
    <div className="page"> 
      <div className="login-container">
        <div className="login-title">Welcome to GRAMIN AI</div>
        <div className="login-box">
          <LoginBox onLogin={handleLogin} />
          <div className="signup-link">
            Don’t have an account?{" "}
            <button onClick={() => navigate("/register")}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
