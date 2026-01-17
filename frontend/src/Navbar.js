import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
export default function Navbar() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  return (
    <div className="navbar">
  <div className="logo-row">
    <span className="logo">P🐾wmise</span>
  </div>
      <nav>
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/adopt">Adopt</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/board">Board</Link>         
        </div>
        <div className="welcome">
          {username ? `Welcome ${username}!` : ""}
        </div>
      </nav>
    </div>
  );
}
