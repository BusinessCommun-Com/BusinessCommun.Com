import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaSignOutAlt, FaSave, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../Services/api'; // Ensure we have the api instance

export default function UserSidebar({ user, email }) {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || ''
    });

    const sidebarRef = useRef(null);

    // Click outside to revert
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isEditing && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsEditing(false);
                setFormData({ // Revert data
                    firstName: user.firstName,
                    lastName: user.lastName
                });
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isEditing, user]);

    if (!user) return null;

    const hasChanges = () => {
        return formData.firstName !== user.firstName || formData.lastName !== user.lastName;
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully");
        navigate("/login"); // Correct route
        window.location.reload();
    };

    const handleEditToggle = () => {
        setFormData({
            firstName: user.firstName,
            lastName: user.lastName
        });
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            // Validate
            if (!formData.firstName || !formData.lastName) {
                toast.error("Name fields cannot be empty");
                return;
            }

            // Call API
            const response = await api.put(`/users/update/${user.id}`, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: user.email,
                password: "DUMMY_PASSWORD_TO_BYPASS_NULL_CHECK"
            });

            // Extract new token and data
            // Structure: { status: "success", message: "...", data: { message: "...", jwt: "..." } }
            const newToken = response.data.data ? response.data.data.jwt : null;

            if (newToken) {
                localStorage.setItem("token", newToken);

                // Update local user object
                const updatedUser = { ...user, firstName: formData.firstName, lastName: formData.lastName };
                localStorage.setItem("user", JSON.stringify(updatedUser));

                toast.success("Profile updated successfully");
                setIsEditing(false);

                // Optional: Force reload to ensure everything syncs or just rely on react state update if parent passes new props
                // Ideally, parent wrapper checks local storage, but reload is safer for now
                window.location.reload();
            } else {
                // Determine if it was success but no token (shouldn't happen with our backend change)
                toast.success("Profile updated. please re-login to see changes.");
                handleLogout();
            }

        } catch (error) {
            console.error("Update failed", error);
            if (error.response && error.response.status === 403) {
                toast.error("Session expired or unauthorized. Please login again.");
            } else {
                toast.error("Failed to update profile");
            }
        }
    };

    return (
        <div className="user-sidebar" style={{ top: '100px' }} ref={sidebarRef}>
            <div className="user-avatar">
                {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
            </div>

            {!isEditing ? (
                <h4 className="user-name">{user.firstName} {user.lastName}</h4>
            ) : (
                <div className="mb-2 text-center">
                    <input
                        type="text"
                        name="firstName"
                        className="form-control form-control-sm mb-1"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                    />
                    <input
                        type="text"
                        name="lastName"
                        className="form-control form-control-sm"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                    />
                </div>
            )}

            <p className="user-email">{email || "N/A"}</p>

            <div className="user-actions mt-3 mb-3 d-flex justify-content-center gap-2">
                {!isEditing ? (
                    <button className="btn btn-sm btn-outline-primary" onClick={handleEditToggle} title="Edit Profile">
                        <FaEdit /> Edit Profile
                    </button>
                ) : (
                    <>
                        <button
                            className="btn btn-sm btn-success"
                            onClick={handleSave}
                            title="Save"
                            disabled={!hasChanges()}
                        >
                            <FaSave /> Save
                        </button>
                        <button className="btn btn-sm btn-secondary" onClick={handleEditToggle} title="Cancel">
                            <FaTimes />
                        </button>
                    </>
                )}
            </div>

            <div className="user-details">
                <div className="detail-item">
                    <span className="detail-label">First Name</span>
                    <span className="detail-value">{isEditing ? "Editing..." : user.firstName}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Last Name</span>
                    <span className="detail-value">{isEditing ? "Editing..." : user.lastName}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{email || "N/A"}</span>
                </div>
            </div>

            {/* Logout Button */}
            <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
                <FaSignOutAlt className="me-2" /> Logout
            </button>

            {/* Registration CTA - Only show if not OWNER or if needed */}
            <div className="register-cta mt-4">
                <p className="register-text">
                    Register your firm to connect with potential partner or investor
                </p>
                <Link to="/home/company-registration" className="register-btn">
                    Register
                </Link>
            </div>
        </div>
    );
}
