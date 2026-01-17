import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // IMPORTANT:
    // localhost → browser
    // backend → docker-to-docker only
    const API_URL = "http://localhost:5000/api";

    const url = isLogin ? `${API_URL}/login` : `${API_URL}/register`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Authentication failed");
        return;
      }

    
      if (isLogin) {
        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("username", form.username);
        navigate("/home");
      }

      else {
        setSuccess("Registration successful! Please login.");
        setIsLogin(true);
        setForm({ username: "", password: "" });
      }

    } catch (err) {
      console.error(err);
      setError("Server error, please try again later.");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button className="login-btn" type="submit">
        {isLogin ? "Login" : "Sign Up"}
      </button>

      {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
      {success && (
        <div style={{ color: "green", textAlign: "center" }}>{success}</div>
      )}

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        {isLogin ? (
          <>
            New user?{" "}
            <button
              type="button"
              className="login-btn"
              onClick={() => {
                setIsLogin(false);
                setError("");
                setSuccess("");
              }}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              type="button"
              className="login-btn"
              onClick={() => {
                setIsLogin(true);
                setError("");
                setSuccess("");
              }}
            >
              Log In
            </button>
          </>
        )}
      </div>
    </form>
  );
}
