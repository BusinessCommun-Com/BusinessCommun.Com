import React from 'react';

export default function CompanyCard({ company }) {
    if (!company) return null;

    return (
        <div className="my-company-card mb-4">
            <div className="company-body">
                <h4 className="card-title">{company.name}</h4>
                <div className="info-grid">
                    {/* Row 1: Domain & Org Type */}
                    <div className="info-item">
                        <span className="info-label">Domain</span>
                        <span className="info-value">{company.domain || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Organization Type</span>
                        <span className="info-value">{company.orgType || 'N/A'}</span>
                    </div>

                    {/* Row 2: GST & Est Year */}
                    <div className="info-item">
                        <span className="info-label">GST No</span>
                        <span className="info-value">{company.gstNo || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Establishment Year</span>
                        <span className="info-value">{company.establishmentYear || 'N/A'}</span>
                    </div>

                    {/* Row 3: Revenue */}
                    <div className="info-item full-width">
                        <span className="info-label">Revenue</span>
                        <span className="info-value">{company.revenue ? `₹${company.revenue.toLocaleString()}` : 'N/A'}</span>
                    </div>

                    {/* Row 4: Address */}
                    <div className="info-item full-width">
                        <span className="info-label">Address</span>
                        <span className="info-value">{company.address || 'N/A'}</span>
                    </div>

                    {/* Row 5: City & State */}
                    <div className="info-item">
                        <span className="info-label">City</span>
                        <span className="info-value">{company.city || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">State</span>
                        <span className="info-value">{company.state || 'N/A'}</span>
                    </div>
                </div>

                {/* Owner Info Section */}
                {(company.ownerName || company.mobileNumber) && (
                    <div className="owner-section">
                        <h6 className="section-subtitle">Owner Information</h6>
                        <div className="info-grid compact">
                            <div className="info-item">
                                <span className="info-label">Owner Name</span>
                                <span className="info-value">{company.ownerName || 'N/A'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Mobile Number</span>
                                <span className="info-value">{company.mobileNumber || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pitch Card (Nested) */}
                {company.title && (
                    <div className="pitch-card">
                        <div className="pitch-body">
                            <h5 className="card-title">Pitch Details</h5>
                            <div className="info-grid">
                                <div className="info-item full-width">
                                    <span className="info-label">Pitch Title</span>
                                    <span className="info-value">{company.title || 'N/A'}</span>
                                </div>
                                <div className="info-item full-width">
                                    <span className="info-label">Description</span>
                                    <span className="info-value">{company.description || 'N/A'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Website</span>
                                    <span className="info-value">
                                        {company.website ? (
                                            <a href={company.website} target="_blank" rel="noopener noreferrer">
                                                {company.website}
                                            </a>
                                        ) : 'N/A'}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Product Image</span>
                                    <span className="info-value">{company.productImage || 'N/A'}</span>
                                </div>
                            </div>

                            {/* Connect Card (Nested inside Pitch) */}
                            {company.connectType && (
                                <div className="connect-card">
                                    <div className="connect-body">
                                        <h6 className="card-title">Looking for: {company.connectType === "INVESTOR" ? "Investor" : "Partner"}</h6>
                                        <div className="info-grid">
                                            <div className="info-item full-width">
                                                <span className="info-label">Requirement</span>
                                                <span className="info-value">{company.requirement || 'N/A'}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Skills Required</span>
                                                <span className="info-value">{company.skills || 'N/A'}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Equity Percentage</span>
                                                <span className="info-value">{company.equityPercentage ? `${company.equityPercentage}%` : 'N/A'}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Minimum Qualification</span>
                                                <span className="info-value">{company.minimumQualification || 'N/A'}</span>
                                            </div>
                                            {company.connectType === "INVESTOR" && (
                                                <div className="info-item">
                                                    <span className="info-label">Investment Range</span>
                                                    <span className="info-value">{company.investmentRange || 'N/A'}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
