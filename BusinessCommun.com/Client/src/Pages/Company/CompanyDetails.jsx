import React, { useState, useEffect } from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import companies from "../../data/companies";
import { getCompanyDetailsById } from "../../Services/companyDetails";
import "../Companies_listing/Companies_listing.css";
import "./CompanyDetails.css";
import  compImage  from "../../assets/Company_images/compImag.jpg";

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

  return (
    <div className="company-profile">
      <div className="company-card-panel">
        {/* ================= HEADER ================= */}
        <div className="profile-header">
          <img
            className="profile-logo"
            src={compImage}
            alt={companyDetails.name}
          />

          <div style={{ flex: 1 }}>
            <h2 className="profile-title">{companyDetails.name}</h2>

            {/* ✅ Owner Name at Top */}
            <p style={{ fontSize: "16px", color: "#555", marginBottom: "6px" }}>
              Owned by <strong>{companyDetails?.ownerName || "—"}</strong>
            </p>

            <p className="profile-pitch">
              {companyDetails.title || companyDetails.description || "—"}
            </p>

          </div>
        </div>

        {/* ================= DETAILS GRID ================= */}
        <div className="profile-grid">
          <div className="detail-item">
            <span className="detail-key">Founded in</span>
            <div>{companyDetails?.establishmentYear ?? "—"}</div>
          </div>

          <div className="detail-item">
            <span className="detail-key">Domain</span>
            <div>{companyDetails?.domain || "—"}</div>
          </div>

          <div className="detail-item">
            <span className="detail-key">Organization Type</span>
            <div>{companyDetails?.orgType || "—"}</div>
          </div>

          <div className="detail-item">
            <span className="detail-key">Website</span>
            <div>
              {companyDetails?.website ? (
                <a
                  href={companyDetails.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {companyDetails.website}
                </a>
              ) : (
                "—"
              )}
            </div>
          </div>

          <div className="detail-item">
            <span className="detail-key">City</span>
            <div>{companyDetails?.city || "—"}</div>
          </div>

          <div className="detail-item">
            <span className="detail-key">State</span>
            <div>{companyDetails?.state || "—"}</div>
          </div>

          <div className="detail-item">
            <span className="detail-key">Annual Revenue</span>
            <div>
              {companyDetails?.revenue
                ? `₹${(companyDetails.revenue / 100000).toFixed(2)} L`
                : "—"}
            </div>
          </div>
        </div>

        {/* ================= DESCRIPTION ================= */}
        <div className="section-block">
          <h3>Description</h3>
          <p>{companyDetails?.description || "No description available."}</p>
        </div>

        {/* ================= ADDRESS ================= */}
        <div className="section-block">
          <h3>Address</h3>
          <p>
            {companyDetails?.address || "—"}
            {companyDetails?.city && `, ${companyDetails.city}`}
            {companyDetails?.state && `, ${companyDetails.state}`}
          </p>
        </div>

        {/* ================= PRODUCT ================= */}
        <div className="section-block">
          <h3>Product</h3>
          {companyDetails?.productImage && (
            <img
              src={companyDetails.productImage}
              alt="Product"
              style={{
                maxWidth: "200px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            />
          )}
          <p>Product Image URL: {companyDetails?.productImage || "—"}</p>
        </div>

        {/* ================= CONNECT BUTTON ================= */}
        <div className="connect-row">
          <button className="connect-btn" onClick={handleConnect}>
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}
