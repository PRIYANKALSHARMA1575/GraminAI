import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterBox from "../components/Registerbox"; // Adjust path as needed
import "./Register.css";
import { registerUser } from "../api"; // You must define this function

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
     try {
      await registerUser(
        formData.Name,
        formData.Email,
        formData.Password,
        formData.Contact,
        formData.Age
      );
      alert("Registration successful");
      navigate("/");
    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  }; 
  return (
     <div className="page">
      <div className="register-container">
        <div className="register-title">Register to GRAMIN AI</div>
        <div className="register-box">
          <RegisterBox onRegister={handleRegister} />
          <div className="login-redirect">
            Already have an account?{" "}
            <button onClick={() => navigate("/")}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
