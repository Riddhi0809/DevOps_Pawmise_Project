import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="logo-row">
        <span className="logo">P🐾wmise</span>
      </div>

      <nav>
        <div className="welcome">
          {username ? `Welcome ${username}!` : ""}
        </div>

        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/adopt">Adopt</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/board">Board</Link>
          <button className="nav-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}
