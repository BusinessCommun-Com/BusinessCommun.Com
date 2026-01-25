
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    const navigate = useNavigate();

    const handleCompaniesClick = (e) => {
        e.preventDefault();
        const el = document.getElementById("companies");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        } else {
            navigate("/companies");
        }
    };

    return (
      <div>
        {/* NAVBAR OVER SLIDESHOW */}
        <nav className="navbar navbar-expand-lg navbar-style navbar-dark">
          <div className="container-fluid">
            <a style={{ fontSize: "26px" }} className="navbar-brand" href="#">
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
                  <a className="nav-link navText" href="premium-service">
                    Premium Investor
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link navText" href="news">
                    News
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link navText" href="government-schemes">
                    Government Schemes
                  </a>
                </li>
              </ul>

              {/* RIGHT SIDE */}
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link navText" href="/contact-us">
                    Contact Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link navText" href="about-us">
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
      </div>
    );
}