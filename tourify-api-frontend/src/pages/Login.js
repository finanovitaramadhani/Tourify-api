import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "../styles/main.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", { username, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      res.data.role === "admin"
        ? (window.location.href = "/admin")
        : (window.location.href = "/user");
    } catch {
      alert("Login gagal");
    }
  };

  return (
    <div className="hero">
      {/* LEFT CONTENT */}
      <div className="hero-text">
        <span className="hero-badge">Open Tourism API</span>

        <h1>
          Explore Indonesian <br /> Tourism Data
        </h1>

        <p className="hero-desc">
          Access curated tourism destinations, locations, and maps through a
          modern and secure Open API platform.
        </p>

        <ul className="hero-features">
          <li>📍 Real tourism data from OpenStreetMap</li>
          <li>🔐 Secure API Key access</li>
          <li>🗺️ Integrated interactive maps</li>
          <li>⚡ Designed for developers & students</li>
        </ul>
      </div>

      {/* RIGHT CARD */}
      <div className="card">
        <h2>Login to Tourify API</h2>
        <p className="card-subtitle">
          Sign in to manage your API keys
        </p>

        <input
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p className="card-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
