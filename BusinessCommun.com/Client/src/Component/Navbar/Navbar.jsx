
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
import { useAuth } from "../../Providers/AuthProvider";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleCompaniesClick = (e) => {
    e.preventDefault();
    const el = document.getElementById("companies");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to home and scroll to companies section
      navigate("/home#companies");
    }
  };

  const onLogOut = (e) => {
    e.preventDefault();
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("userId");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  return (
    <div>
      {/* NAVBAR OVER SLIDESHOW */}
      <nav className="navbar navbar-expand-lg navbar-style navbar-dark">
        <div className="container-fluid">
          <Link style={{ fontSize: "26px" }} className="navbar-brand" to="/home">
            BusinessCommun
          </Link>

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
                <Link className="nav-link navText" to="/home/premium-service">
                  Premium Investor
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link navText" to="/home/news">
                  News
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link navText" to="/home/government-schemes">
                  Government Schemes
                </Link>
              </li>
            </ul>

            {/* RIGHT SIDE */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link navText" to="/home/contact-us">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link navText" to="/home/about-us">
                  About Us
                </Link>
              </li>

              <li className="nav-item">
                {user && (
                  <Link className="nav-link navText d-flex align-items-center" to="/home/my-account">
                    <FaUserCircle size={20} style={{ marginRight: "8px" }} />
                    {user.firstName}
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {!user && (
                  <Link className="nav-link navText" to="/login">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}