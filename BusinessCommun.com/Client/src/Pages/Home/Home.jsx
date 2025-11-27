import React from "react";
import "./Home.css";
import SlideShow from "../../Component/SlideShow/SlideShow";

export default function Home() {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-style">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          BussinessCommun
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
                href="#"
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
    <SlideShow/>
        </>
  );
}
