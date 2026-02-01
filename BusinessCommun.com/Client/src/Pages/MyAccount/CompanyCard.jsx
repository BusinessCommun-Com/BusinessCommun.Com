import React, { useState, useEffect, useRef } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { updateCompany, deleteCompany } from '../../Services/companyService';
import { toast } from 'react-toastify';
import * as yup from 'yup';

// Validation Schema
const validationSchema = yup.object().shape({
    name: yup.string().required("Company name is required").max(100),
    domainId: yup.string().required("Domain is required"),
    orgTypeId: yup.string().required("Organization type is required"),
    gstNo: yup.string().required("GST No is required").matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST Number"),
    establishmentYear: yup.number().typeError("Year must be a number").required("Est. Year is required").min(1800, "Invalid Year").max(new Date().getFullYear(), "Future year not allowed"),
    revenue: yup.number().typeError("Revenue must be a number").required("Revenue is required").min(0, "Revenue cannot be negative"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    // Pitch Validations
    title: yup.string().required("Pitch title is required"),
    description: yup.string().required("Description is required").min(20, "Description too short"),
    website: yup.string().url("Invalid URL").nullable(),
    // Connect Validations
    requirement: yup.string().required("Requirement is required"),
    skills: yup.string().required("Skills are required"),
    equityPercentage: yup.number().typeError("Must be a number").min(0).max(100, "Max 100%"),
    minimumQualification: yup.string().required("Qualification is required"),
    // investmentRange is optional/conditional, we can leave it loose or strictly conditional
    investmentRange: yup.string().nullable()
});

export default function CompanyCard({ company, domains, orgTypes }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    const cardRef = useRef(null);

    const getInitialFormData = () => {
        if (!company) return {};
        return {
            ...company,
            domainId: domains?.find(d => d.name === company.domain)?.id,
            orgTypeId: orgTypes?.find(o => o.name === company.orgType)?.id,
            revenue: company.revenue,
            establishmentYear: company.establishmentYear,
            userConnectType: company.connectType ? company.connectType.toLowerCase() : ""
        };
    };

    useEffect(() => {
        if (company) {
            setFormData(getInitialFormData());
        }
    }, [company, domains, orgTypes, isEditing]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isEditing && cardRef.current && !cardRef.current.contains(event.target)) {
                setIsEditing(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isEditing]);

    const hasChanges = () => {
        const initial = getInitialFormData();
        const editableFields = [
            'name', 'domainId', 'orgTypeId', 'establishmentYear', 'revenue',
            'address', 'city', 'state', 'title', 'description', 'website',
            'productImage', 'requirement', 'skills', 'equityPercentage',
            'minimumQualification', 'investmentRange'
        ];
        return editableFields.some(field => {
            const v1 = formData[field] ?? '';
            const v2 = initial[field] ?? '';
            return v1 != v2;
        });
    };

    if (!company) return null;

    const handleEditToggle = () => setIsEditing(!isEditing);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error on change
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this company? This action cannot be undone.")) {
            try {
                await deleteCompany(company.id);
                toast.success("Company deleted successfully");
                window.location.reload(); // Refresh to update list
            } catch (error) {
                toast.error("Failed to delete company");
            }
        }
    };

    const handleSave = async () => {
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({}); // Clear errors if valid

            await updateCompany(company.id, formData);
            toast.success("Company updated successfully");
            setIsEditing(false);
            window.location.reload(); // Refresh to show new data
        } catch (error) {
            if (error.inner) {
                // Yup validation errors
                const newErrors = {};
                error.inner.forEach(err => {
                    newErrors[err.path] = err.message;
                });
                setErrors(newErrors);
                toast.error("Please fix form errors");
            } else {
                toast.error("Failed to update company");
            }
        }
    };

    return (
        <div className="my-company-card mb-4 position-relative" ref={cardRef}>
            {/* ACTION BUTTONS */}
            <div className="card-actions" style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '10px', zIndex: 10 }}>
                {!isEditing ? (
                    <>
                        <button className="btn btn-sm btn-outline-primary" onClick={handleEditToggle} title="Edit Company">
                            <FaEdit /> Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={handleDelete} title="Delete Company">
                            <FaTrash />
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="btn btn-sm btn-success"
                            onClick={handleSave}
                            title="Save Changes"
                            disabled={!hasChanges()} // Disable if no changes
                        >
                            <FaSave /> Save
                        </button>
                        <button className="btn btn-sm btn-secondary" onClick={handleEditToggle} title="Cancel">
                            <FaTimes /> Cancel
                        </button>
                    </>
                )}
            </div>

            <div className="company-body">
                {isEditing ? (
                    <div className="form-group mb-4">
                        <label className="text-muted small mb-1 fw-bold text-uppercase">Company Name</label>
                        <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} name="name" value={formData.name || ''} onChange={handleChange} />
                        {errors.name && <div className="text-danger small mt-1">{errors.name}</div>}
                    </div>
                ) : (
                    <h4 className="card-title">{company.name}</h4>
                )}

                <div className="info-grid">
                    {/* Row 1: Domain & Org Type */}
                    <div className="info-item">
                        <span className="info-label mb-1">DOMAIN</span>
                        {isEditing ? (
                            <>
                                <select className={`form-control form-control-sm ${errors.domainId ? 'is-invalid' : ''}`} name="domainId" value={formData.domainId || ''} onChange={handleChange}>
                                    <option value="">Select Domain</option>
                                    {domains && domains.map(d => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                                {errors.domainId && <div className="text-danger small mt-1">{errors.domainId}</div>}
                            </>
                        ) : (
                            <span className="info-value">{company.domain || 'N/A'}</span>
                        )}
                    </div>
                    <div className="info-item">
                        <span className="info-label mb-1">ORGANIZATION TYPE</span>
                        {isEditing ? (
                            <>
                                <select className={`form-control form-control-sm ${errors.orgTypeId ? 'is-invalid' : ''}`} name="orgTypeId" value={formData.orgTypeId || ''} onChange={handleChange}>
                                    <option value="">Select Type</option>
                                    {orgTypes && orgTypes.map(o => (
                                        <option key={o.id} value={o.id}>{o.name}</option>
                                    ))}
                                </select>
                                {errors.orgTypeId && <div className="text-danger small mt-1">{errors.orgTypeId}</div>}
                            </>
                        ) : (
                            <span className="info-value">{company.orgType || 'N/A'}</span>
                        )}
                    </div>

                    {/* Row 2: GST & Est Year */}
                    <div className="info-item">
                        <span className="info-label mb-1">GST NO</span>
                        <span className="info-value">{company.gstNo || 'N/A'}</span>
                        {/* GST is valid usually not editable, keeping it readonly or editable? Let's keep read-only for now as it's unique ID */}
                    </div>
                    <div className="info-item">
                        <span className="info-label mb-1">ESTABLISHMENT YEAR</span>
                        {isEditing ? (
                            <input type="number" className="form-control form-control-sm" name="establishmentYear" value={formData.establishmentYear || ''} onChange={handleChange} />
                        ) : (
                            <span className="info-value">{company.establishmentYear || 'N/A'}</span>
                        )}
                    </div>

                    {/* Row 3: Revenue */}
                    <div className="info-item full-width">
                        <span className="info-label mb-1">REVENUE</span>
                        {isEditing ? (
                            <input type="number" className="form-control form-control-sm" name="revenue" value={formData.revenue || ''} onChange={handleChange} />
                        ) : (
                            <span className="info-value">{company.revenue ? `₹${company.revenue.toLocaleString()}` : 'N/A'}</span>
                        )}
                    </div>

                    {/* Row 4: Address */}
                    <div className="info-item full-width">
                        <span className="info-label mb-1">ADDRESS</span>
                        {isEditing ? (
                            <textarea className="form-control form-control-sm" name="address" rows="2" value={formData.address || ''} onChange={handleChange} />
                        ) : (
                            <span className="info-value">{company.address || 'N/A'}</span>
                        )}
                    </div>

                    {/* Row 5: City & State */}
                    <div className="info-item">
                        <span className="info-label mb-1">CITY</span>
                        {isEditing ? (
                            <input type="text" className="form-control form-control-sm" name="city" value={formData.city || ''} onChange={handleChange} />
                        ) : (
                            <span className="info-value">{company.city || 'N/A'}</span>
                        )}
                    </div>
                    <div className="info-item">
                        <span className="info-label mb-1">STATE</span>
                        {isEditing ? (
                            <input type="text" className="form-control form-control-sm" name="state" value={formData.state || ''} onChange={handleChange} />
                        ) : (
                            <span className="info-value">{company.state || 'N/A'}</span>
                        )}
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
                {(company.title || isEditing) && (
                    <div className="pitch-card">
                        <div className="pitch-body">
                            <h5 className="card-title">Pitch Details</h5>
                            <div className="info-grid">
                                <div className="info-item full-width">
                                    <span className="info-label">Pitch Title</span>
                                    {isEditing ? (
                                        <>
                                            <input type="text" className={`form-control form-control-sm ${errors.title ? 'is-invalid' : ''}`} name="title" value={formData.title || ''} onChange={handleChange} />
                                            {errors.title && <div className="text-danger small mt-1">{errors.title}</div>}
                                        </>
                                    ) : (
                                        <span className="info-value">{company.title || 'N/A'}</span>
                                    )}
                                </div>
                                <div className="info-item full-width">
                                    <span className="info-label">Description</span>
                                    {isEditing ? (
                                        <>
                                            <textarea className={`form-control form-control-sm ${errors.description ? 'is-invalid' : ''}`} rows="3" name="description" value={formData.description || ''} onChange={handleChange} />
                                            {errors.description && <div className="text-danger small mt-1">{errors.description}</div>}
                                        </>
                                    ) : (
                                        <span className="info-value">{company.description || 'N/A'}</span>
                                    )}
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Website</span>
                                    <span className="info-value">
                                        {isEditing ? (
                                            <>
                                                <input type="text" className={`form-control form-control-sm ${errors.website ? 'is-invalid' : ''}`} name="website" value={formData.website || ''} onChange={handleChange} />
                                                {errors.website && <div className="text-danger small mt-1">{errors.website}</div>}
                                            </>
                                        ) : (
                                            company.website ? (
                                                <a href={company.website} target="_blank" rel="noopener noreferrer">
                                                    {company.website}
                                                </a>
                                            ) : 'N/A'
                                        )}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Product Image URL</span>
                                    {isEditing ? (
                                        <input type="text" className="form-control form-control-sm" name="productImage" value={formData.productImage || ''} onChange={handleChange} />
                                    ) : (
                                        <span className="info-value">{company.productImage || 'N/A'}</span>
                                    )}
                                </div>
                            </div>

                            {/* Connect Card (Nested inside Pitch) */}
                            {(company.connectType || isEditing) && (
                                <div className="connect-card">
                                    <div className="connect-body">
                                        <h6 className="card-title">Looking for: {company.connectType === "INVESTOR" ? "Investor" : "Partner"}</h6>
                                        <div className="info-grid">
                                            <div className="info-item full-width">
                                                <span className="info-label">Requirement</span>
                                                {isEditing ? (
                                                    <>
                                                        <textarea className={`form-control form-control-sm ${errors.requirement ? 'is-invalid' : ''}`} name="requirement" value={formData.requirement || ''} onChange={handleChange} />
                                                        {errors.requirement && <div className="text-danger small mt-1">{errors.requirement}</div>}
                                                    </>
                                                ) : (
                                                    <span className="info-value">{company.requirement || 'N/A'}</span>
                                                )}
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Skills Required</span>
                                                {isEditing ? (
                                                    <>
                                                        <input type="text" className={`form-control form-control-sm ${errors.skills ? 'is-invalid' : ''}`} name="skills" value={formData.skills || ''} onChange={handleChange} />
                                                        {errors.skills && <div className="text-danger small mt-1">{errors.skills}</div>}
                                                    </>
                                                ) : (
                                                    <span className="info-value">{company.skills || 'N/A'}</span>
                                                )}
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Equity Percentage</span>
                                                {isEditing ? (
                                                    <>
                                                        <input type="text" className={`form-control form-control-sm ${errors.equityPercentage ? 'is-invalid' : ''}`} name="equityPercentage" value={formData.equityPercentage || ''} onChange={handleChange} />
                                                        {errors.equityPercentage && <div className="text-danger small mt-1">{errors.equityPercentage}</div>}
                                                    </>
                                                ) : (
                                                    <span className="info-value">{company.equityPercentage ? `${company.equityPercentage}%` : 'N/A'}</span>
                                                )}
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Minimum Qualification</span>
                                                {isEditing ? (
                                                    <>
                                                        <input type="text" className={`form-control form-control-sm ${errors.minimumQualification ? 'is-invalid' : ''}`} name="minimumQualification" value={formData.minimumQualification || ''} onChange={handleChange} />
                                                        {errors.minimumQualification && <div className="text-danger small mt-1">{errors.minimumQualification}</div>}
                                                    </>
                                                ) : (
                                                    <span className="info-value">{company.minimumQualification || 'N/A'}</span>
                                                )}
                                            </div>
                                            {(company.connectType === "INVESTOR" || (isEditing && formData.userConnectType === "investor")) && (
                                                <div className="info-item">
                                                    <span className="info-label">Investment Range</span>
                                                    {isEditing ? (
                                                        <input type="text" className="form-control form-control-sm" name="investmentRange" value={formData.investmentRange || ''} onChange={handleChange} />
                                                    ) : (
                                                        <span className="info-value">{company.investmentRange || 'N/A'}</span>
                                                    )}
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
