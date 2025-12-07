import React from "react";
import "./Companies_listing.css";
import img from "../../assets/Company_images/compImag.jpg";
import { Link } from "react-router-dom"; // make sure you're using react-router
import companies from "../../data/companies";

function Companies_listing() {
  return (
    <div id="companies" className="companies-section">
      <div className="container">
        <h2 className="companies-title">
          Featured Companies on <span>BusinessCommun.com</span>
        </h2>
        <p className="companies-subtitle">
          Discover growing businesses, potential partners, and inspiring
          entrepreneurs from across regions.
        </p>

        <div className="row g-4">
          {companies.map((company) => (
            <div className="col-12 col-sm-6 col-lg-3" key={company.id}>
              <Link
                to={`/companies/${company.id}`} // route to company details page
                state={{ company }}
                className="company-card-link"
              >
                <div className="card company-card">
                  <img
                    src={company.logo}
                    className="card-img-top company-card-img"
                    alt={company.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title company-card-title">
                      {company.name}
                    </h5>
                    <p className="card-text company-card-text">
                      {company.pitch}
                    </p>
                    <span className="company-card-cta">
                      View company details →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Companies_listing;
