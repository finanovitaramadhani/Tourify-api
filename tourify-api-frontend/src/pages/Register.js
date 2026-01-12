import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "../styles/main.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/register", { username, password });
      alert("Register berhasil");
      window.location.href = "/";
    } catch {
      alert("Register gagal");
    }
  };

  return (
    <div className="hero">
      <div className="hero-text">
        <h1>Get Your API Access</h1>
        <p>Create an account to generate your API key</p>
      </div>

      <div className="card">
        <h2>Create Account</h2>

        <input
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Register</button>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
