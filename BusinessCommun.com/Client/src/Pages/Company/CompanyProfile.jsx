import React from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import companies from "../../data/companies";
import "../Companies_listing/Companies_listing.css";
import "./CompanyProfile.css";

export default function CompanyProfile() {
  const { id } = useParams();
  const location = useLocation();
  const companyFromState = location.state && location.state.company;
  const companyId = Number(id);

  const company = companyFromState || companies.find((c) => c.id === companyId);

  if (!company) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Company not found</h2>
        <p>The requested company does not exist.</p>
        <Link to="/home">Return home</Link>
      </div>
    );
  }
  const navigate = useNavigate();

  const handleConnect = () => {
    // navigate to contact page with company in state so contact form can pre-fill
    navigate("/contact-us", { state: { company } });
  };

  return (
    <div className="company-profile">
      <div className="company-card-panel">
        <div className="profile-header">
          <img className="profile-logo" src={company.logo} alt={company.name} />
          <div style={{ flex: 1 }}>
            <h2 className="profile-title">{company.name}</h2>
            <p className="profile-pitch">{company.pitch}</p>
            <div className="profile-actions">
              <Link to="/company-register" style={{ color: "#1756c5" }}>
                Edit company details
              </Link>
            </div>
          </div>
        </div>

        <div className="profile-grid">
          <div className="detail-item">
            <span className="detail-key">Founded</span>
            <div>{company.details?.founded || "—"}</div>
          </div>
          <div className="detail-item">
            <span className="detail-key">Industry</span>
            <div>{company.details?.industry || "—"}</div>
          </div>
          <div className="detail-item">
            <span className="detail-key">Employees</span>
            <div>{company.details?.employees || "—"}</div>
          </div>
          <div className="detail-item">
            <span className="detail-key">Website</span>
            <div>
              {company.details?.website ? (
                <a href={company.details.website}>{company.details.website}</a>
              ) : (
                "—"
              )}
            </div>
          </div>
        </div>

        <div className="section-block">
          <h3>Partners</h3>
          {company.partners && company.partners.length ? (
            <ul>
              {company.partners.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          ) : (
            <p>No partners registered.</p>
          )}
        </div>

        <div className="section-block">
          <h3>Investors / Funding</h3>
          {company.investors && company.investors.length ? (
            <ul>
              {company.investors.map((inv, idx) => (
                <li key={idx}>{inv}</li>
              ))}
            </ul>
          ) : (
            <p>No investor information available.</p>
          )}
        </div>

        <div className="connect-row">
          <button className="connect-btn" onClick={handleConnect}>
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}
