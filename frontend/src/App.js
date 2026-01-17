import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Adopt from "./Adopt";
import Shop from './Shop';
import ProductPage from './ProductPage';
import Board from './Board';
import Login from './Login';
import "./App.css";
import "./Carousel.css";

function Carousel() {
  const navigate = useNavigate();
  const images = [
    {
      src: "/adopt.png",
      alt: "Adopt a pet",
      heading: "Adopt a Pet",
      description: "Help loving pets find their forever home.",
      button: {
        label: "Adopt Now",
        onClick: () => navigate("/adopt")
      }
    },
    {
      src: "/board.jpg",
      alt: "Pet Boarding",
      heading: "Board Your Pet",
      description: "Avail safe boarding for your pets while you are away.",
      button: {
        label: "Avail Now",
        onClick: () => navigate("/board")
      }
    },
    {
      src: "/shop.png",
      alt: "Support Shelters",
      heading: "Shop for a Cause",
      description: "Every purchase supports rescue and shelter animals.",
      button: {
        label: "Shop Now",
        onClick: () => navigate("/shop")
      }
    },
    {
      src: "/comm.jpg",
      alt: "Community Care",
      heading: "Join Our Community",
      description: "Volunteer, foster or help animals in need.",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrev = () => setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  const goNext = () => setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  const current = images[currentIndex];

  return (
    <div className="carousel-mainbox">
      <button className="arrow-btn left" onClick={goPrev}>
        <img src="/left.png" alt="Previous" />
      </button>
      <div className="carousel-slide">
        <img src={current.src} alt={current.alt} className="carousel-slide-img" />
        <div className="carousel-content">
          <h2 className="carousel-heading">{current.heading}</h2>
          <p className="carousel-desc">{current.description}</p>
          {current.button && (
            <button className="btn main-carousel" onClick={current.button.onClick}>
              {current.button.label}
            </button>
          )}
        </div>
      </div>
      <button className="arrow-btn right" onClick={goNext}>
        <img src="/right.png" alt="Next" />
      </button>
    </div>
  );
}

// Home component with direct YouTube embed
function Home() {
  return (
    <div className="app">
      <div className="carousel-fullwidth">
        <Carousel />
      </div>
      <div className="video-container">
       <center><h3>Your Help Matters!!</h3></center> 
        <center><iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/PVPyLoYyUVk"
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        /></center>
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/" || location.pathname === "/login";
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} /> 
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
