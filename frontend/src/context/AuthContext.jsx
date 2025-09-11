import React, { createContext, useEffect, useState } from "react";
import api, { setAuthToken } from "../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("g_user")) || null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("g_token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      localStorage.setItem("g_token", token);
    } else {
      setAuthToken(null);
      localStorage.removeItem("g_token");
    }
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("g_user", JSON.stringify(user));
    else localStorage.removeItem("g_user");
  }, [user]);

  // Signup: try /api/auth/register first (if backend provides it),
  // otherwise fallback to POST /api/users (simple CRUD).
  async function signup({ name, email, password }) {
    setLoading(true);
    try {
      // try full auth register
      const res = await api.post("/api/auth/register", { name, email, password });
      if (res?.data?.token) {
        setToken(res.data.token);
        setUser(res.data.user);
        setLoading(false);
        return { ok: true };
      }
    } catch (err) {
      // fallback to simple CRUD endpoint
      try {
        const fallback = await api.post("/api/users", {
          name,
          email,
          // simple backend expects maybe 'age', add placeholder
          age: 0,
        });
        setUser(fallback.data);
        setToken(null);
        setLoading(false);
        return { ok: true };
      } catch (e) {
        setLoading(false);
        return { ok: false, error: e?.response?.data?.message || e.message };
      }
    }
    setLoading(false);
    return { ok: false, error: "Signup failed" };
  }

  // Login: try /api/auth/login first (if available), else fallback to searching users
  async function login({ email, password }) {
    setLoading(true);
    try {
      // try full auth login
      const res = await api.post("/api/auth/login", { email, password });
      if (res?.data?.token) {
        setToken(res.data.token);
        setUser(res.data.user);
        setLoading(false);
        return { ok: true };
      }
    } catch (err) {
      // fallback: query users (simple CRUD). This is insecure (no password check) — dev only.
      try {
        const all = await api.get("/api/users");
        const found = Array.isArray(all.data) ? all.data.find(u => u.email === email) : null;
        if (found) {
          setUser(found); // logged in (no token)
          setToken(null);
          setLoading(false);
          return { ok: true, fallback: true };
        } else {
          setLoading(false);
          return { ok: false, error: "User not found (backend fallback)" };
        }
      } catch (e) {
        setLoading(false);
        return { ok: false, error: e?.response?.data?.message || e.message };
      }
    }
    setLoading(false);
    return { ok: false, error: "Login failed" };
  }

  function logout() {
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
