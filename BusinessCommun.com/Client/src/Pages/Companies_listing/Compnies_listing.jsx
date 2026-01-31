import React, { useState, useEffect } from "react";
import "./Companies_listing.css";
import img from "../../assets/Company_images/compImag.jpg";
import { Link, useLocation } from "react-router-dom";
import { getApprovedCompDetails } from "../../Services/companyDetails";
import SlideShow from "../../Component/SlideShow/SlideShow";
import LoadingSpinner from "../../Component/Loading/LoadingSpinner";

function Companies_listing() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await getApprovedCompDetails();
        // response may be array or wrapped object depending on API
        setCompanies(Array.isArray(response) ? response : response?.data || []);
      } catch (err) {
        console.error("Error fetching companies:", err);
        setError(err?.message || String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Handle hash scroll after component mounts
  useEffect(() => {
    if (location.hash === "#companies") {
      setTimeout(() => {
        const el = document.getElementById("companies");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      <SlideShow />

      <div id="companies" className="companies-section">
        <div className="container">
          <h2 className="companies-title mt-5">
            Featured Companies on <span>BusinessCommun.com</span>
          </h2>
          <p className="companies-subtitle">
            Discover growing businesses, potential partners, and inspiring
            entrepreneurs from across regions.
          </p>

          {loading && <LoadingSpinner message="Loading companies..." />}

          {error && (
            <div className="mb-3 text-danger">
              Error loading companies: {error}
            </div>
          )}

          <div className="row g-4">
            {!loading && companies && companies.length > 0
              ? companies.map((company) => (
                <div className="col-12 col-sm-6 col-lg-3" key={company.id}>
                  <Link
                    to={`/home/company-details/${company.id}`}
                    state={{ company }}
                    className="company-card-link"
                  >
                    <div className="card company-card">
                      <img
                        src={img}
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
              ))
              : !loading && !error && <div>No companies found.</div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Companies_listing;
