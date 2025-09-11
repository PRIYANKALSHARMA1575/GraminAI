import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // optional for fallback
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError(null);
    const res = await signup({ name, email, password });
    if (res.ok) navigate("/dashboard");
    else setError(res.error || "Signup failed");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create account</h2>
        <form onSubmit={submit}>
          <label>Full name</label>
          <input value={name} onChange={e => setName(e.target.value)} required />
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
          <label>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
          {error && <div className="form-error">{error}</div>}
          <button type="submit" className="btn btn-cta">Create account</button>
        </form>
        <p className="muted">Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
}
