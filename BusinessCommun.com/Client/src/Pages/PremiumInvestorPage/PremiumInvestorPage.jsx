// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion"; 
// import { fetchInvestors } from "../../Services/premiumService";
// import "./PremiumInvestorPage.css";

// const PremiumInvestorPage = () => {
//     const [investors, setInvestors] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const navigate = useNavigate();
//     const location = useLocation();

//     const userId = location.state?.userId || localStorage.getItem("premiumUserId");

//     useEffect(() => {
//         if (!userId) {
//             setError("Session expired. Please log in to access premium data.");
//             setLoading(false);
//             return;
//         }

//         const loadPremiumData = async () => {
//             try {
//                 const data = await fetchInvestors(userId);
//                 if (data.preview) {
//                     setError("Access Denied: Premium subscription required.");
//                 } else {
//                     setInvestors(data.investors || []);
//                 }
//             } catch (err) {
//                 setError("Failed to connect to the server.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         loadPremiumData();
//     }, [userId]);

//     if (loading) return (
//         <div className="loader-container">
//             <div className="premium-loader"></div>
//             <p>Verifying Credentials...</p>
//         </div>
//     );

// //     return (
// //         <div className="premium-page-v2">
// //             <header className="premium-hero">
// //                 <motion.div
// //                     initial={{ opacity: 0, y: -20 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     className="container text-center"
// //                 >
// //                     <span className="premium-badge">VIP ACCESS UNLOCKED</span>
// //                     <h1 className="premium-heading">Premium Investors</h1>
// //                     <div className="heading-underline"></div>
// //                     <p className="premium-subtext">
// //                         Connect directly with verified venture partners and angel investors.
// //                     </p>
// //                 </motion.div>
// //             </header>

// //             <section className="investor-grid-section">
// //                 <div className="container">
// //                     <div className="grid-controls">
// //                         <h3>Showing {investors.length} Elite Partners</h3>
// //                         <button className="back-btn" onClick={() => navigate("/premium-service")}>
// //                             ← Back to Plans
// //                         </button>
// //                     </div>

// //                     <div className="row g-4">
// //                         {investors.map((inv, idx) => (
// //                             <motion.div
// //                                 key={inv.id}
// //                                 className="col-lg-6" 
// //                                 initial={{ opacity: 0, scale: 0.9 }}
// //                                 animate={{ opacity: 1, scale: 1 }}
// //                                 transition={{ delay: idx * 0.1 }}
// //                             >
// //                                 <div className="investor-card-premium landscape-mode">
// //                                     <div className="card-accent"></div>
// //                                     <div className="card-inner">
// //                                         {/* Avatar Section */}
// //                                         <div className="avatar-wrapper">
// //                                             <div className="avatar-circle">
// //                                                 {inv.name ? inv.name.charAt(0) : "I"}
// //                                             </div>
// //                                         </div>

// //                                         {/* Content Section */}
// //                                         <div className="investor-info">
// //                                             <div className="info-main">
// //                                                 <h5 className="inv-name">{inv.name}</h5>
// //                                                 <span className="inv-company">{inv.company}</span>
// //                                             </div>

// //                                             <div className="contact-details">
// //                                                 <div className="detail-item">
// //                                                     <span className="icon">📧</span>
// //                                                     <a href={`mailto:${inv.email}`}>{inv.email}</a>
// //                                                 </div>
// //                                                 <div className="detail-item">
// //                                                     <span className="icon">📞</span>
// //                                                     <span>{inv.phone}</span>
// //                                                 </div>
// //                                             </div>

// //                                             <p className="inv-details">{inv.details}</p>
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             </motion.div>
// //                         ))}
// //                     </div>
// //                 </div>
// //             </section>
// //         </div>
// //     );
// // };

// // export default PremiumInvestorPage;

// return (
//         <div className="premium-page-v2">
//             {/* Hero Section - Now more compact */}
//             <header className="premium-hero">
//                 <motion.div 
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="container text-center"
//                 >
//                     <span className="premium-badge">VIP ACCESS</span>
//                     <h1 className="premium-heading">Premium Investors</h1>
//                     <div className="heading-underline"></div>
//                     <p className="premium-subtext">
//                         Connect directly with verified venture partners and angel investors.
//                     </p>
//                 </motion.div>
//             </header>

//             <section className="investor-grid-section">
//                 <div className="container">
//                     <div className="grid-controls">
//                         <h3>Showing {investors.length} Elite Partners</h3>
//                         <button className="back-btn" onClick={() => navigate("/premium-service")}>
//                             ← Back to Plans
//                         </button>
//                     </div>

//                     {/* Updated Grid Row */}
//                     <div className="row g-4">
//                         {investors.map((inv, idx) => (
//                             <motion.div 
//                                 key={inv.id} 
//                                 className="col-lg-6" 
//                                 initial={{ opacity: 0, scale: 0.9 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 transition={{ delay: idx * 0.1 }}
//                             >
//                                 <div className="investor-card-premium landscape-mode">
//                                     <div className="card-accent"></div>
//                                     <div className="card-inner">
//                                         <div className="avatar-wrapper">
//                                             <div className="avatar-circle">
//                                                 {inv.name.charAt(0)}
//                                             </div>
//                                         </div>
                                        
//                                         <div className="investor-info">
//                                             <h5 className="inv-name">{inv.name}</h5>
//                                             <span className="inv-company">{inv.company}</span>
                                            
//                                             <div className="contact-details">
//                                                 <div className="detail-item">
//                                                     <span className="icon">📧</span>
//                                                     <a href={`mailto:${inv.email}`}>{inv.email}</a>
//                                                 </div>
//                                                 <div className="detail-item">
//                                                     <span className="icon">📞</span>
//                                                     <span>{inv.phone}</span>
//                                                 </div>
//                                             </div>

//                                             <p className="inv-details">{inv.details}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default PremiumInvestorPage;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 
import { fetchInvestors } from "../../Services/premiumService";
import "./PremiumInvestorPage.css"; 

const PremiumInvestorPage = () => {
    const [investors, setInvestors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const userId = location.state?.userId || localStorage.getItem("premiumUserId");

    useEffect(() => {
        if (!userId) {
            setError("Session expired. Please log in to access premium data.");
            setLoading(false);
            return;
        }

        const loadPremiumData = async () => {
            try {
                const data = await fetchInvestors(userId);
                if (data.preview) {
                    setError("Access Denied: Premium subscription required.");
                } else {
                    setInvestors(data.investors || []);
                }
            } catch (err) {
                setError("Failed to connect to the server.");
            } finally {
                setLoading(false);
            }
        };
        loadPremiumData();
    }, [userId]);

    if (loading) return (
        <div className="loader-container">
            <div className="premium-loader"></div>
            <p>Verifying Credentials...</p>
        </div>
    );

    return (
        <div className="premium-page-v2">
            <header className="premium-hero">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="container text-center"
                >
                    <span className="premium-badge">VIP ACCESS</span>
                    <h1 className="premium-heading">Premium Investors</h1>
                    <div className="heading-underline"></div>
                    <p className="premium-subtext">
                        Connect directly with verified venture partners and angel investors.
                    </p>
                </motion.div>
            </header>

            <section className="investor-grid-section">
                <div className="container">
                    <div className="grid-controls">
                        <h3>Showing {investors.length} Elite Partners</h3>
                        <button className="back-btn" onClick={() => navigate("/premium-service")}>
                            ← Back to Plans
                        </button>
                    </div>

                    <div className="row g-4">
                        {investors.map((inv, idx) => (
                            <motion.div 
                                key={inv.id} 
                                className="col-lg-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <div className="investor-card-premium landscape-mode">
                                    <div className="card-accent"></div>
                                    <div className="card-inner">
                                        <div className="avatar-wrapper">
                                            <div className="avatar-circle">
                                                {inv.name ? inv.name.charAt(0) : "I"}
                                            </div>
                                        </div>
                                        
                                        <div className="investor-info">
                                            <div className="info-header">
                                                <h5 className="inv-name">{inv.name}</h5>
                                                <span className="inv-company">{inv.company}</span>
                                            </div>
                                            
                                            <div className="contact-details">
                                                <div className="detail-item">
                                                    <span className="icon">📧</span>
                                                    <a href={`mailto:${inv.email}`}>{inv.email}</a>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="icon">📞</span>
                                                    <span>{inv.phone}</span>
                                                </div>
                                            </div>

                                            <p className="inv-details">{inv.details}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PremiumInvestorPage;