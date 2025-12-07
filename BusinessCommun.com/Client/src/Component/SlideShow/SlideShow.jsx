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

  const handleCompaniesClick = (e) => {
    e.preventDefault();
    const el = document.getElementById("companies");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // if companies section isn't on this page, navigate to companies route
      navigate("/companies");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    navigate("/company-register");
  };

  return (
    <div className="hero-wrapper">
      {/* NAVBAR OVER SLIDESHOW */}
      <nav className="navbar navbar-expand-lg navbar-style navbar-dark">
        <div className="container-fluid">
          <a style={{fontSize : "26px"}} className="navbar-brand" href="#">
            BusinessCommun
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarText">
            {/* LEFT SIDE */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active navText"
                  aria-current="page"
                  href="#companies"
                  onClick={handleCompaniesClick}
                >
                  Companies
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link navText" href="#">
                  Premium Investor
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link navText" href="#">
                  News
                </a>
              </li>
            </ul>

            {/* RIGHT SIDE */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link navText" href="#">
                  Contact Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link navText" href="#">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link navText" href="#">
                  LogOut
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* SLIDESHOW */}
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
    </div>
  );
}
