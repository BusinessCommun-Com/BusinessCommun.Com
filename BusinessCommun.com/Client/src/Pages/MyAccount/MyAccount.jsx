import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Providers/AuthProvider';
import { getMyCompanyDetails } from '../../Services/companyService';
import { getDomains, getOrgTypes } from '../../Services/utilService';
import CompanyCard from './CompanyCard';
import UserSidebar from './UserSidebar';
import './MyAccount.css';

export default function MyAccount() {
    const { user } = useAuth();
    const [tokenDetails, setTokenDetails] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [domains, setDomains] = useState([]);
    const [orgTypes, setOrgTypes] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                setTokenDetails(JSON.parse(jsonPayload));
            } catch (e) {
                console.error("Failed to decode token", e);
            }
        }
    }, []);

    useEffect(() => {
        if (tokenDetails?.role === 'ROLE_OWNER') {
            const fetchData = async () => {
                try {
                    const [res, domainRes, orgRes] = await Promise.all([
                        getMyCompanyDetails(),
                        getDomains(),
                        getOrgTypes()
                    ]);

                    if (res.status === 'success') {
                        setCompanies(res.data);
                    }
                    if (domainRes) setDomains(domainRes);
                    if (orgRes) setOrgTypes(orgRes);

                } catch (err) {
                    console.error("Failed to fetch data", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        } else {
            setLoading(false);
        }
    }, [tokenDetails]);

    if (!user) {
        return <div className="text-center mt-5">Please log in to view your account.</div>;
    }

    return (
        <div className="container-fluid pt-4 my-account-wrapper">
            <div className="row">
                {/* LEFT: Company Cards */}
                <div className="col-lg-8 col-md-7">
                    <h3 className="section-title mb-4">My Companies</h3>

                    {loading && tokenDetails?.role === 'ROLE_OWNER' && (
                        <div className="alert alert-secondary">Loading company details...</div>
                    )}

                    {!loading && companies.length === 0 && (
                        <div className="empty-state">
                            <p>You haven't registered a company yet.</p>
                        </div>
                    )}

                    {/* Map through all companies */}
                    {companies.map((company) => (
                        <CompanyCard
                            key={company.id}
                            company={company}
                            domains={domains}
                            orgTypes={orgTypes}
                        />
                    ))}
                </div>

                {/* RIGHT: User Sidebar */}
                <div className="col-lg-4 col-md-5">
                    <UserSidebar user={user} email={tokenDetails?.email} />
                </div>
            </div>
        </div>
    );
}
