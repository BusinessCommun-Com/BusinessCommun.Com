import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>BusinessCommun</h3>
          <p className="brand-tag">Partner · Invest · Grow</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/companies">Companies</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/company-register">Register</Link>
            </li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <address>
            <div>123 Business Street</div>
            <div>City, State ZIP</div>
            <div>
              <a href="mailto:info@businesscommun.com">
                info@businesscommun.com
              </a>
            </div>
            <div>
              <a href="tel:+1234567890">+1 (234) 567-890</a>
            </div>
          </address>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <small>
            © {new Date().getFullYear()} BusinessCommun. All rights reserved.
          </small>
          <div className="footer-social">
            <a href="#" aria-label="twitter">
              Twitter
            </a>
            <a href="#" aria-label="linkedin">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
