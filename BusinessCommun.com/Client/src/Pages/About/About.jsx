import React from "react";
import "./About.css";
import img1 from "../../assets/UI_Images/img1.jpg";

export default function About() {
  return (
    <>
      <div className="about-wrapper">

        
        <div className="bg-circle bg1" />
        <div className="bg-circle bg2" />

        <section className="about-hero">
          
          <div className="about-left">
            <span className="about-label">ABOUT US</span>

            <h1 className="about-title">
              Empowering <span>Entrepreneurs</span> to Build, Connect, and Grow.
            </h1>

            <p className="about-desc">
              BusinessCommun.com is a digital platform built to help entrepreneurs turn ideas into thriving businesses. From networking and investor access to mentorship and growth resources, we bring everything a startup needs onto one trusted platform.
            </p>

            <p className="about-desc">
              Our platform acts as a one-stop destination where entrepreneurs can register their startups, showcase their innovations, and connect directly with investors.
            </p>

            <p className="about-desc">
              BusinessCommun empowers the startup ecosystem through seamless collaboration, visibility, and credibility.
            </p>
          </div>

          <div className="about-right">
            <img src={img1} alt="Business team collaborating" className="about-img" />
          </div>

        </section>
      </div>
    </>
  );
}
