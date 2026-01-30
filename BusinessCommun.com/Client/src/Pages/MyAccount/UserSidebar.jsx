import React from 'react';
import { Link } from 'react-router-dom';

export default function UserSidebar({ user, email }) {
    if (!user) return null;

    return (
        <div className="user-sidebar" style={{ top: '100px' }}>
            <div className="user-avatar">
                {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
            </div>
            <h4 className="user-name">{user.firstName} {user.lastName}</h4>
            <p className="user-email">{email || "N/A"}</p>

            <div className="user-details">
                <div className="detail-item">
                    <span className="detail-label">First Name</span>
                    <span className="detail-value">{user.firstName}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Last Name</span>
                    <span className="detail-value">{user.lastName}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{email || "N/A"}</span>
                </div>
            </div>

            {/* Registration CTA */}
            <div className="register-cta">
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
