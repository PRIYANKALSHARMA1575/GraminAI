import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // may be unused with fallback
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError(null);
    const res = await login({ email, password });
    if (res.ok) {
      navigate("/dashboard");
    } else {
      setError(res.error || "Login failed");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={submit}>
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
          <label>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
          {error && <div className="form-error">{error}</div>}
          <button type="submit" className="btn btn-cta">Login</button>
        </form>
        <p className="muted">Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
}
