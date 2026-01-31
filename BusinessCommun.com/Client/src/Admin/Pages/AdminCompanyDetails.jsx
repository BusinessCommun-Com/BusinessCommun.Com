import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAdminCompanyById } from "../Services/companyService";

import "./AdminCompanyDetails.css";
console.log("✅ AdminCompanyDetails Component Loaded");
export default function AdminCompanyDetails() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetchAdminCompanyById(id).then(setCompany);
  }, [id]);

  if (!company) return <h3 className="loading-text">Loading...</h3>; // ⭐ CHANGED

  return (
    <div className="admin-company-container">
      
      {/* ✅ HEADER */}
      <div className="admin-header">
        <img
          src={company.logoUrl || "/default-logo.png"}
          alt="logo"
          className="company-logo"
        />

        <div>
          <h1>{company.name}</h1>

          <p className="owner-text"> {/* ⭐ CHANGED */}
            <b>Owner:</b> {company.ownerName || "N/A"}  
            {" "}({company.mobileNumber || "N/A"})
          </p>

          {/* ✅ Status Badge */}
          <span className="status-badge"> {/* ⭐ CHANGED */}
            {company.status || "ACTIVE"}
          </span>
        </div>
      </div>

      {/* ✅ BASIC INFO */}
      <h2 className="section-title">Company Overview</h2> {/* ⭐ CHANGED */}

      <div className="info-grid">
        <InfoCard label="Founded In" value={company.establishmentYear} />
        <InfoCard label="GST Number" value={company.gstNo} />
        <InfoCard label="Domain" value={company.domain} />
        <InfoCard label="Org Type" value={company.orgType} />
        <InfoCard label="Annual Revenue" value={`₹ ${company.revenue}`} />
        <InfoCard label="Website" value={company.website} />
      </div>

      {/* ✅ LOCATION */}
      <h2 className="section-title">Location Details</h2> {/* ⭐ CHANGED */}

      <div className="info-grid">
        <InfoCard label="City" value={company.city} />
        <InfoCard label="State" value={company.state} />
        <InfoCard label="Full Address" value={company.address} /> {/* ⭐ CHANGED */}
      </div>

      {/* ✅ PITCH */}
      <h2 className="section-title">Pitch Information</h2> {/* ⭐ CHANGED */}

      <div className="section-box"> {/* ⭐ CHANGED */}
        <h3>{company.title || "No Pitch Title"}</h3>
        <p>{company.description || "No description available"}</p>
      </div>

      {/* ✅ CONNECT DETAILS */}
      {company.connectType && (  // ⭐ CHANGED (Show only if exists)
        <>
          <h2 className="section-title">Connect Details</h2>

          <div className="connect-box"> {/* ⭐ CHANGED */}
            <p><b>Connect Type:</b> {company.connectType}</p>
            <p><b>Requirement:</b> {company.requirement}</p>
            <p><b>Skills:</b> {company.skills}</p>
            <p><b>Equity %:</b> {company.equityPercentage}</p>

            {company.connectType === "INVESTOR" && (
              <p><b>Investment Range:</b> {company.investmentRange}</p>
            )}

            <p><b>Minimum Qualification:</b> {company.minimumQualification}</p>
          </div>
        </>
      )}
    </div>
  );
}

/* ✅ Small Info Card Component */
function InfoCard({ label, value }) {
  return (
    <div className="info-card">
      <h4>{label}</h4>
      <p>{value || "-"}</p>
    </div>
  );
}
