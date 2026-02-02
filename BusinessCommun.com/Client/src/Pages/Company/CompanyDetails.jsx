import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCompanyDetailsById } from "../../Services/companyDetails";
import { FaMapMarkerAlt, FaGlobe, FaBuilding, FaDollarSign, FaEnvelope, FaWhatsapp, FaArrowLeft, FaBriefcase, FaUser, FaRegCalendarAlt } from "react-icons/fa";
import compImage from "../../assets/Company_images/compImag.jpg";
import ImageModal from "../../Component/Common/ImageModal";
import "./CompanyDetails.css";

function CompanyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const companyId = Number(id);

  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal State
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    images: [],
    index: 0
  });

  const openModal = (images, index = 0) => {
    setModalConfig({
      isOpen: true,
      images: Array.isArray(images) ? images : [images],
      index
    });
  };

  const closeModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  useEffect(() => {
    async function fetchCompanyDetails() {
      try {
        setLoading(true);
        const response = await getCompanyDetailsById(companyId);
        setCompanyDetails(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCompanyDetails();
  }, [companyId]);

  const handleConnect = () => {
    const mobile = companyDetails?.mobileNumber || "8999224867";

    if (!mobile) {
      alert("Owner mobile number not available!");
      return;
    }

    let phone = mobile.replace(/\D/g, "");
    if (!phone.startsWith("91") && phone.length === 10) {
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
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger" role="alert">
          <h2>Error loading company details</h2>
          <p>{error}</p>
          <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  if (!companyDetails) {
    return (
      <div className="container mt-5 text-center">
        <h2>Company not found</h2>
        <p>The requested company does not exist.</p>
        <Link to="/home" className="btn btn-primary">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="company-profile">
      <div className="company-card-panel">
        <div className="profile-header">
          <img
            className="profile-logo"
            src={companyDetails.logoUrl || compImage}
            alt={companyDetails.name}
            style={{ cursor: 'pointer' }}
            onClick={() => openModal(companyDetails.logoUrl || compImage)}
          />
          <div style={{ flex: 1 }}>
            <h2 className="profile-title">{companyDetails.name}</h2>
            <p style={{ fontSize: "16px", color: "#666", marginBottom: "6px" }}>
              Owned by <strong>{companyDetails?.ownerName || "—"}</strong>
            </p>
            <p className="profile-pitch">
              {companyDetails.title || "No pitch title available"}
            </p>
          </div>
        </div>

        <div className="profile-grid">
          <div className="detail-item">
            <span className="detail-key"><FaRegCalendarAlt /> Founded in</span>
            <div className="detail-value">{companyDetails?.establishmentYear ?? "—"}</div>
          </div>
          <div className="detail-item">
            <span className="detail-key"><FaBriefcase /> Domain</span>
            <div className="detail-value">{companyDetails?.domain || "—"}</div>
          </div>
          <div className="detail-item">
            <span className="detail-key"><FaBuilding /> Org Type</span>
            <div className="detail-value">{companyDetails?.orgType || "—"}</div>
          </div>
          <div className="detail-item">
            <span className="detail-key"><FaGlobe /> Website</span>
            <div className="detail-value">
              {companyDetails?.website ? (
                <a href={companyDetails.website} target="_blank" rel="noopener noreferrer">
                  {companyDetails.website}
                </a>
              ) : "—"}
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-key"><FaMapMarkerAlt /> City</span>
            <div className="detail-value">{companyDetails?.city || "—"}</div>
          </div>
          <div className="detail-item">
            <span className="detail-key"><FaMapMarkerAlt /> State</span>
            <div className="detail-value">{companyDetails?.state || "—"}</div>
          </div>
          <div className="detail-item">
            <span className="detail-key"><FaDollarSign /> Revenue</span>
            <div className="detail-value">
              {companyDetails?.revenue
                ? `₹${companyDetails.revenue.toLocaleString()}`
                : "—"}
            </div>
          </div>
        </div>

        <div className="section-block">
          <h3>Description</h3>
          <p className="text-justify">{companyDetails?.description || "No description available."}</p>
        </div>

        <div className="section-block">
          <h3>Address</h3>
          <p>
            {companyDetails?.address || "—"}
            {companyDetails?.city && `, ${companyDetails.city}`}
            {companyDetails?.state && `, ${companyDetails.state}`}
          </p>
        </div>

        <div className="section-block">
          <h3>Product Gallery</h3>
          <div className="d-flex flex-wrap gap-3 mt-3">
            {companyDetails?.productImageUrls && companyDetails.productImageUrls.length > 0 ? (
              companyDetails.productImageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Product ${index + 1}`}
                  className="gallery-img-preview"
                  onClick={() => openModal(companyDetails.productImageUrls, index)}
                  style={{ cursor: 'pointer', width: '200px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                />
              ))
            ) : (
              companyDetails?.productImage ? (
                <img
                  src={companyDetails.productImage}
                  alt="Product"
                  className="gallery-img-preview"
                  onClick={() => openModal([companyDetails.productImage], 0)}
                  style={{ cursor: 'pointer', width: '200px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                />
              ) : <p className="text-muted">No product images available</p>
            )}
          </div>
        </div>

        <div className="connect-row">
          <button className="connect-btn" onClick={handleConnect}>
            <FaWhatsapp /> Connect on WhatsApp
          </button>
        </div>
      </div>

      <ImageModal
        isOpen={modalConfig.isOpen}
        images={modalConfig.images}
        initialIndex={modalConfig.index}
        onClose={closeModal}
      />
    </div>
  );
}

export default CompanyDetails;
