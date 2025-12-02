import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SlideShow.css";
import ss1 from "../../assets/SlideShow_images/ss1.png";
import ss2 from "../../assets/SlideShow_images/ss2.png";
import ss3 from "../../assets/SlideShow_images/ss3.png";
import ss4 from "../../assets/SlideShow_images/ss4.png";
import ss5 from "../../assets/SlideShow_images/ss5.png";
import ss6 from "../../assets/SlideShow_images/ss6.png";



const slideImages = [ss1, ss6, ss2, ss3, ss4, ss5];

export default function SlideShow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // auto-change images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideImages.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    navigate("/company-register"); // change path if needed
  };

  return (
    <div
      className="slideshow-container"
      style={{ backgroundImage: `url(${slideImages[currentIndex]})` }}
    >
      <div className="slideshow-overlay">
        <div className="slideshow-content">
          <h1 className="slideshow-title">Partner Connecting Platform</h1>
          <p className="slideshow-subtitle">
            Register your firm to connect with potential partner or investor
          </p>
          <button className="slideshow-button" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
