



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ SLIDESHOW IMAGES
  const images = [
    "https://tse1.mm.bing.net/th/id/OIP.KOnqTsYD8ejjAHpupTjKswHaEo?pid=Api&P=0&h=180",
    "https://tse3.mm.bing.net/th/id/OIP.0BkSdKUAj2jqe94Fmd52GQHaE8?pid=Api&P=0&h=180",
    "http://images4.fanpop.com/image/photos/22000000/Pets-animals-and-pets-22036172-1024-768.jpg",
    "https://tse1.mm.bing.net/th/id/OIP.er3a-PMbyPbuzO_XziuAHwHaFJ?pid=Api&P=0&h=180",
  ];

  // ✅ SLIDESHOW EFFECT (PUT THIS HERE)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % images.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = isLogin ? "/api/login" : "/api/register";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("username", form.username);
        navigate("/home");
      } else {
        setError(data.message || "Authentication failed");
      }
    } catch {
      setError("Server error, please try again later.");
    }
  };

  return (
    <div className="login-page split-layout">
      {/* LEFT SLIDESHOW */}
      <div className="login-image">
        <img src={images[currentSlide]} alt="Pet" />
      </div>

      {/* RIGHT LOGIN SECTION */}
      <div className="login-right">
        <form className="login-form card" onSubmit={handleSubmit}>
          <h2>{isLogin ? "LOGIN" : "SIGN UP"}</h2>

          <label>Username</label>
          <input
            name="username"
            placeholder="Enter your username"
            value={form.username}
            onChange={handleChange}
            required
          />





          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="login-btn" type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>

          {error && <p className="error-text">{error}</p>}

          <p className="switch-text">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <span onClick={() => setIsLogin(false)}>SIGN UP</span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span onClick={() => setIsLogin(true)}>LOG IN</span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
