import React, { useState, useEffect } from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import companies from "../../data/companies";
import { getCompanyDetailsById } from "../../Services/companyDetails";
import "../Companies_listing/Companies_listing.css";
import "./CompanyDetails.css";
import compImage from "../../assets/Company_images/compImag.jpg";
import { FaWhatsapp } from "react-icons/fa";

export default function CompanyProfile() {
  const { id } = useParams();
  const location = useLocation();
  const companyFromState = location.state && location.state.company;
  const companyId = Number(id);
  const navigate = useNavigate();
  const company = companyFromState || companies.find((c) => c.id === companyId);

  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCompanyDetails() {
      try {
        setLoading(true);
        const response = await getCompanyDetailsById(companyId);
        setCompanyDetails(response.data);
        console.log("Fetched company details:", response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCompanyDetails();
  }, [companyId]);

  const handleConnect = () => {
    const mobile = "8999224867"; //companyDetails?.ownerMobileNumber;

    if (!mobile) {
      alert("Owner mobile number not available!");
      return;
    }

    // Convert to international format (India)
    let phone = mobile.replace(/\D/g, ""); // remove non-numbers

    if (!phone.startsWith("91")) {
      phone = "91" + phone;
    }

    const message = `Hello ${companyDetails?.ownerName || ""}, 
I am interested in your company "${companyDetails?.name}". 
I found it on BusinessCommun platform.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Loading company details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Error loading company details: {error}</h2>
      </div>
    );
  }

  if (!companyDetails) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Company not found</h2>
        <p>The requested company does not exist.</p>
        <Link to="/home">Return home</Link>
      </div>
    );
  }

  const renderField = (label, value, isLink) => {
    if (value === null || value === undefined || value === "") return null;
    return (
      <div className="detail-item">
        <span className="detail-key">{label}</span>
        <div>
          {isLink ? (
            <a href={value} target="_blank" rel="noopener noreferrer">
              {value}
            </a>
          ) : (
            value
          )}
        </div>
      </div>
    );
  };

  const formatRevenue = (val) => {
    if (!val && val !== 0) return null;
    try {
      return `₹${Number(val).toLocaleString()}`;
    } catch {
      return val;
    }
  };

  return (
    <div className="company-profile">
      <div className="company-card-panel">
        {/* ================= HEADER ================= */}
        <div className="profile-header">
          <img
            className="profile-logo"
            src={companyDetails.logoUrl || compImage}
            alt={companyDetails.name}
          />

          <div style={{ flex: 1 }}>
            <h2 className="profile-title">{companyDetails.name}</h2>

            {/* ✅ Owner Name at Top */}
            {companyDetails?.ownerName && (
              <p
                style={{ fontSize: "16px", color: "#555", marginBottom: "6px" }}
              >
                Owned by <strong>{companyDetails?.ownerName}</strong>
              </p>
            )}

            <p className="profile-pitch">
              {companyDetails.title ||
                companyDetails.description ||
                "Company profile and key details — fields omitted when not provided."}
            </p>
          </div>
        </div>

        {/* ================= DETAILS GRID ================= */}
        <div className="profile-grid">
          {renderField("Founded in", companyDetails?.establishmentYear)}
          {renderField("Domain", companyDetails?.domain)}
          {renderField("Organization Type", companyDetails?.orgType)}
          {companyDetails?.revenue !== null &&
            companyDetails?.revenue !== undefined && (
              <div className="detail-item">
                <span className="detail-key">Annual Revenue</span>
                <div>{formatRevenue(companyDetails.revenue)}</div>
              </div>
            )}
          {renderField("Website", companyDetails?.website, true)}
          {renderField("Connect Type", companyDetails?.connectType)}
          {renderField("City", companyDetails?.city)}
          {renderField("State", companyDetails?.state)}
        </div>

        {/* ================= DESCRIPTION ================= */}
        {companyDetails?.description && (
          <div className="section-block">
            <h3>Description</h3>
            <p>{companyDetails.description}</p>
          </div>
        )}

        {/* ================= ADDRESS ================= */}
        {(companyDetails?.address ||
          companyDetails?.city ||
          companyDetails?.state) && (
          <div className="section-block">
            <h3>Address</h3>
            <p>
              {companyDetails?.address}
              {companyDetails?.city && `, ${companyDetails.city}`}
              {companyDetails?.state && `, ${companyDetails.state}`}
            </p>
          </div>
        )}

        {/* ================= PRODUCT ================= */}
        {companyDetails?.productImage && (
          <div className="section-block">
            <h3>Product</h3>
            <img
              src={companyDetails.productImage}
              alt="Product"
              style={{
                maxWidth: "200px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            />
          </div>
        )}

        {/* ================= REQUIREMENTS & SKILLS ================= */}
        {(companyDetails?.requirement ||
          companyDetails?.skills ||
          companyDetails?.minimumQualification) && (
          <div className="section-block">
            <h3>Requirements & Skills</h3>
            <ul>
              {companyDetails?.requirement && (
                <li>Requirement: {companyDetails.requirement}</li>
              )}
              {companyDetails?.skills && (
                <li>Skills: {companyDetails.skills}</li>
              )}
              {companyDetails?.minimumQualification && (
                <li>
                  Minimum Qualification: {companyDetails.minimumQualification}
                </li>
              )}
            </ul>
          </div>
        )}

        {/* ================= INVESTMENT / FINANCIAL ================= */}
        {(companyDetails?.investmentRange ||
          companyDetails?.equityPercentage) && (
          <div className="section-block">
            <h3>Investment / Financial</h3>
            <ul>
              {companyDetails?.investmentRange && (
                <li>Investment Range: {companyDetails.investmentRange}</li>
              )}
              {companyDetails?.equityPercentage && (
                <li>Equity Percentage: {companyDetails.equityPercentage}%</li>
              )}
            </ul>
          </div>
        )}

        {/* ================= CONNECT BUTTON ================= */}
        <div className="connect-row">
          <button className="connect-btn" onClick={handleConnect}>
            <FaWhatsapp /> Connect on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
