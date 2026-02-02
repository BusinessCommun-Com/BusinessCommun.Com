// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./PremiumService.css";
// import { fetchInvestors } from '../../Services/premiumService';
// import emailjs from '@emailjs/browser';
// import api from "../../Services/api";

// const PremiumService = () => {
//     const [userId, setUserId] = useState('');
//     const [billing, setBilling] = useState("monthly");
//     const [selectedPlan, setSelectedPlan] = useState(null);
//     const [showPurchaseModal, setShowPurchaseModal] = useState(false);
//     const [message, setMessage] = useState('');
//     const [loadingInvestors, setLoadingInvestors] = useState(false);

//     const navigate = useNavigate();

//     const loadRazorpayScript = () => {
//         return new Promise((resolve) => {
//             const script = document.createElement("script");
//             script.src = "https://checkout.razorpay.com/v1/checkout.js";
//             script.onload = () => resolve(true);
//             script.onerror = () => resolve(false);
//             document.body.appendChild(script);
//         });
//     };

//     const getPrice = (plan) => {
//         return plan[billing];
//     };

//     const plans = [
//         {
//             name: "Basic",
//             tagline: "Perfect for individuals and freelancers",
//             monthly: 499,
//             quarterly: 1299,
//             yearly: 4499,
//             features: ["Access to core features", "Email support", "15 Calls per month", "Conference for 5 participants"],
//             buttonText: "Get Started",
//             popular: false,
//         },
//         {
//             name: "Standard",
//             tagline: "Ideal for growing teams",
//             monthly: 999,
//             quarterly: 2699,
//             yearly: 8999,
//             features: ["Everything in Basic", "Priority support", "30 Calls per month", "Conference for 5 participants"],
//             buttonText: "Choose Standard",
//             popular: true,
//         },
//         {
//             name: "Premium",
//             tagline: "Best for enterprises & large teams",
//             monthly: 1999,
//             quarterly: 5399,
//             yearly: 17999,
//             features: ["Everything in Standard", "Dedicated HR manager", "Unlimited Calls", "Full Investment Support"],
//             buttonText: "Go Premium",
//             popular: false,
//         },
//     ];

//     const handleRazorpayPayment = async () => {
//         if (!userId) {
//             setMessage('Please enter your User ID to proceed');
//             return;
//         }

//         const scriptLoaded = await loadRazorpayScript();
//         if (!scriptLoaded) {
//             alert("Razorpay SDK failed to load.");
//             return;
//         }

//         try {
//             const amount = getPrice(selectedPlan);
//             const orderRes = await api.post('/api/premium/create-razorpay-order', {
//                 amount: amount, userId: userId,
//                 plan: selectedPlan.name 
//             });
//             const orderData = await orderRes.json();

//             const options = {
//                 key: "rzp_test_S8YJ78ThpDYRq5",
//                 amount: orderData.amount,
//                 currency: "INR",
//                 name: "BusinessCommun",
//                 description: `Unlock ${selectedPlan.name} Plan`,
//                 order_id: orderData.id,
//                 handler: async function (response) {
//                     const verifyRes = await fetch('http://localhost:5000/api/premium/verify-payment', {
//                         method: 'POST',
//                         headers: { 'Content-Type': 'application/json' },
//                         body: JSON.stringify({
//                             ...response,
//                             userId,
//                             plan: selectedPlan.name,
//                             amount
//                         })
//                     });

//                     const result = await verifyRes.json();

//                     if (result.status === 'success') {

//                         localStorage.setItem("premiumUserId", userId);

//                         // 2. Wrap EmailJS in a separate async block so it doesn't block redirection
//                         const sendEmail = async () => {
//                             if (result.userEmail) {
//                                 try {
//                                     await emailjs.send(
//                                         'service_ssvxcfq',
//                                         'template_zqt30vo',
//                                         {
//                                             to_name: result.userName || userId,
//                                             to_email: result.userEmail,
//                                             plan_name: selectedPlan.name,
//                                             amount: amount,
//                                             transaction_id: response.razorpay_payment_id
//                                         },
//                                         'etkRBCKb7cUmXoHDU'
//                                     );
//                                     console.log("Email sent!");
//                                 } catch (err) {
//                                     console.error("EmailJS Error:", err);
//                                 }
//                             }
//                         };

//                         // Fire the email function but DON'T 'await' it here
//                         sendEmail();

//                         console.log("Redirecting to Premium Investors Page...");
//                         navigate("/premium-investors", { state: { userId: userId } });

//                     } else {
//                         setMessage("Payment verification failed. Please contact support.");
//                     }
//                 },
//                 theme: { color: "#2563eb" }
//             };

//             const rzp = new window.Razorpay(options);
//             rzp.open();
//         } catch (err) {
//             setMessage("Payment initialization failed.");
//         }
//     };

//     return (
//         <div className="premium-page">
//             <main>
//                 <section className="hero">
//                     <div className="container">
//                         <h2>Premium Services</h2>
//                         <p>Choose a plan that fits you. Upgrade or cancel anytime.</p>

//                         <div className="mb-4" style={{ maxWidth: '300px', margin: '20px auto' }}>
//                             <label className="form-label">Enter User ID to Start:</label>
//                             <input
//                                 className="form-control"
//                                 value={userId}
//                                 onChange={e => setUserId(e.target.value)}
//                                 placeholder="User ID"
//                             />
//                         </div>

//                         <div className="billing-toggle">
//                             {["monthly", "quarterly", "yearly"].map((type) => (
//                                 <button
//                                     key={type}
//                                     className={`billing-btn ${billing === type ? "active" : ""}`}
//                                     onClick={() => setBilling(type)}
//                                 >
//                                     {type.charAt(0).toUpperCase() + type.slice(1)}
//                                 </button>
//                             ))}
//                         </div>
//                         {message && <div className="alert alert-info mt-3">{message}</div>}
//                     </div>
//                 </section>

//                 <section className="pricing-section">
//                     <div className="container pricing-grid">
//                         {plans.map((plan, index) => (
//                             <div
//                                 key={index}
//                                 className={`pricing-card ${plan.popular ? "popular" : ""}`}
//                                 style={{ animationDelay: `${index * 90}ms` }}
//                             >
//                                 {plan.popular && <div className="badge">Most Popular</div>}
//                                 <h3>{plan.name}</h3>
//                                 <p className="tagline">{plan.tagline}</p>
//                                 <p className="price">
//                                     <span className="currency">₹</span>
//                                     <span className="amount">{getPrice(plan)}</span>
//                                     <span className="duration">
//                                         {billing === "monthly" ? "/month" : billing === "quarterly" ? "/quarter" : "/year"}
//                                     </span>
//                                 </p>
//                                 <ul className="features">
//                                     {plan.features.map((f, i) => (
//                                         <li key={i}>✔ {f}</li>
//                                     ))}
//                                 </ul>
//                                 <button
//                                     className="cta-btn"
//                                     disabled={loadingInvestors}
//                                     onClick={async () => {
//                                         if (!userId) {
//                                             setMessage("Please enter a User ID first.");
//                                             return;
//                                         }
//                                         setSelectedPlan(plan);
//                                         try {
//                                             setLoadingInvestors(true);
//                                             const data = await fetchInvestors(userId);
//                                             if (data.preview) {
//                                                 setShowPurchaseModal(true);
//                                             } else {
//                                                 setMessage("You already have Premium access!");
//                                                 navigate("/premium-investors", { state: { userId: userId } });
//                                             }
//                                         } catch (err) {
//                                             setMessage('Unable to verify premium status.');
//                                         } finally {
//                                             setLoadingInvestors(false);
//                                         }
//                                     }}
//                                 >
//                                     {loadingInvestors && selectedPlan?.name === plan.name ? "Processing..." : plan.buttonText}
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 </section>

//                 {showPurchaseModal && selectedPlan && (
//                     <div className="pc-modal-backdrop" onClick={() => setShowPurchaseModal(false)}>
//                         <div className="pc-modal" onClick={e => e.stopPropagation()}>
//                             <div className="pc-modal-header">
//                                 <div>
//                                     <div className="plan-chip">{selectedPlan.name}</div>
//                                     <h4 className="modal-title">Unlock {selectedPlan.name} Access</h4>
//                                 </div>
//                                 <button className="pc-modal-close" onClick={() => setShowPurchaseModal(false)}>×</button>
//                             </div>
//                             <div className="pc-modal-body">
//                                 <div className="price-block">
//                                     <div className="price-amount">₹{getPrice(selectedPlan)}</div>
//                                     <div className="price-duration">{billing === 'monthly' ? '/month' : billing === 'quarterly' ? '/quarter' : '/year'}</div>
//                                 </div>
//                                 <div className="plan-features">
//                                     <strong>Includes:</strong>
//                                     <ul>
//                                         {selectedPlan.features.map((f, i) => <li key={i}>{f}</li>)}
//                                     </ul>
//                                 </div>
//                             </div>
//                             <div className="pc-modal-footer">
//                                 <button className="btn btn-outline-secondary" onClick={() => setShowPurchaseModal(false)}>Cancel</button>
//                                 <button className="btn btn-purchase" onClick={handleRazorpayPayment}>Purchase & Unlock</button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </main>

//             <footer className="footer">
//                 <div className="container">
//                     <p>© {new Date().getFullYear()} BusinessCommun. All rights reserved.</p>
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default PremiumService;

import React, { useState, useEffect } from "react"; // Added useEffect
import { useNavigate } from "react-router-dom";
import "./PremiumService.css";
import { fetchInvestors } from '../../Services/premiumService';
import emailjs from '@emailjs/browser';
import api from "../../Services/api";
import { syncAndFetchUser } from "../../Services/users";

const PremiumService = () => {
    // userId is now null by default and populated via API
    const [userId, setUserId] = useState(null);
    const [billing, setBilling] = useState("monthly");
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [message, setMessage] = useState('');
    const [loadingInvestors, setLoadingInvestors] = useState(false);

    const navigate = useNavigate();

    // FETCH USER ID AUTOMATICALLY ON LOAD
    useEffect(() => {
        const initializeUser = async () => {
            try {
                const data = await syncAndFetchUser();
                if (data && data.userId) {
                    console.log("User Authenticated with ID:", data.userId);
                    setUserId(data.userId);
                }
            } catch (err) {
                setMessage("Failed to authenticate. Please check your connection.");
            }
        };
        initializeUser();
    }, []);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const getPrice = (plan) => {
        return plan[billing];
    };

    const plans = [
        {
            name: "Basic",
            tagline: "Perfect for individuals and freelancers",
            monthly: 499,
            quarterly: 1299,
            yearly: 4499,
            features: ["Access to core features", "Email support", "15 Calls per month", "Conference for 5 participants"],
            buttonText: "Get Started",
            popular: false,
        },
        {
            name: "Standard",
            tagline: "Ideal for growing teams",
            monthly: 999,
            quarterly: 2699,
            yearly: 8999,
            features: ["Everything in Basic", "Priority support", "30 Calls per month", "Conference for 5 participants"],
            buttonText: "Choose Standard",
            popular: true,
        },
        {
            name: "Premium",
            tagline: "Best for enterprises & large teams",
            monthly: 1999,
            quarterly: 5399,
            yearly: 17999,
            features: ["Everything in Standard", "Dedicated HR manager", "Unlimited Calls", "Full Investment Support"],
            buttonText: "Go Premium",
            popular: false,
        },
    ];

    const handleRazorpayPayment = async () => {
        // Validation now checks the state fetched from the DB
        if (!userId) {
            setMessage('Authentication required. Please refresh or login.');
            return;
        }

        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
            alert("Razorpay SDK failed to load.");
            return;
        }

        try {
            const amount = getPrice(selectedPlan);
            const orderRes = await fetch('http://localhost:8765/api/premium/create-razorpay-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: amount,
                    userId: userId,
                    plan: selectedPlan.name
                })
            });

            const orderData = await orderRes.json();
            console.log(orderData)

            const options = {
                key: "rzp_test_S8YJ78ThpDYRq5",
                amount: orderData.amount,
                currency: "INR",
                name: "BusinessCommun",
                description: `Unlock ${selectedPlan.name} Plan`,
                order_id: orderData.id,
                image: "https://cdn.razorpay.com/static/assets/logo/rzp.png",
                handler: async function (response) {
                    try {
                        const verifyRes = await fetch('http://localhost:8765/api/premium/verify-payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                userId: userId,
                                plan: selectedPlan.name,
                                amount: amount
                            })
                        });

                        const result = await verifyRes.json();

                        // Check for both HTTP OK and the success status from your JSON
                        if (verifyRes.ok && result.status === 'success') {
                            setShowPurchaseModal(false);
                            setMessage("Payment Successful! Unlocking Premium...");

                            // Email logic
                            if (result.userEmail) {
                                try {
                                    await emailjs.send(
                                        'service_ssvxcfq',
                                        'template_zqt30vo',
                                        {
                                            to_name: result.userName || "Subscriber",
                                            to_email: result.userEmail,
                                            plan_name: selectedPlan.name,
                                            amount: amount,
                                            transaction_id: response.razorpay_payment_id
                                        },
                                        'etkRBCKb7cUmXoHDU'
                                    );
                                } catch (e) {
                                    console.error("Email notification failed:", e);
                                }
                            }

                            // SUCCESS: Redirect to the investors list
                            navigate("/premium-investors", { state: { userId: userId } });

                        } else {
                            // This captures the 400/500 errors from the backend
                            setMessage(result.message || result.error || "Verification failed.");
                        }
                    } catch (err) {
                        console.error("Network/Verification Error:", err);
                        setMessage("Connection to Gateway failed. Please check your network.");
                    }
                },
                theme: { color: "#2563eb" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            setMessage("Payment initialization failed.");
        }
    }

    return (
        <div className="premium-page">
            <main>
                <section className="hero">
                    <div className="container">
                        <h2>Premium Services</h2>
                        <p>Choose a plan that fits you. Upgrade or cancel anytime.</p>

                        {/* REMOVED: Manual User ID Input UI is gone */}

                        <div className="billing-toggle">
                            {["monthly", "quarterly", "yearly"].map((type) => (
                                <button
                                    key={type}
                                    className={`billing-btn ${billing === type ? "active" : ""}`}
                                    onClick={() => setBilling(type)}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>
                        {message && <div className="alert alert-info mt-3">{message}</div>}
                    </div>
                </section>

                <section className="pricing-section">
                    <div className="container pricing-grid">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`pricing-card ${plan.popular ? "popular" : ""}`}
                                style={{ animationDelay: `${index * 90}ms` }}
                            >
                                {plan.popular && <div className="badge">Most Popular</div>}
                                <h3>{plan.name}</h3>
                                <p className="tagline">{plan.tagline}</p>
                                <p className="price">
                                    <span className="currency">₹</span>
                                    <span className="amount">{getPrice(plan)}</span>
                                    <span className="duration">
                                        {billing === "monthly" ? "/month" : billing === "quarterly" ? "/quarter" : "/year"}
                                    </span>
                                </p>
                                <ul className="features">
                                    {plan.features.map((f, i) => (
                                        <li key={i}>✔ {f}</li>
                                    ))}
                                </ul>
                                <button
                                    className="cta-btn"
                                    disabled={loadingInvestors || !userId} // Button disabled if userId is not yet loaded
                                    onClick={async () => {
                                        if (!userId) {
                                            setMessage("Authenticating user...");
                                            return;
                                        }
                                        setSelectedPlan(plan);
                                        try {
                                            setLoadingInvestors(true);
                                            const data = await fetchInvestors(userId);
                                            if (data.preview) {
                                                setShowPurchaseModal(true);
                                            } else {
                                                setMessage("You already have Premium access!");
                                                navigate("/premium-investors", { state: { userId: userId } });
                                            }
                                        } catch (err) {
                                            setMessage('Unable to verify premium status.');
                                        } finally {
                                            setLoadingInvestors(false);
                                        }
                                    }}
                                >
                                    {loadingInvestors && selectedPlan?.name === plan.name ? "Processing..." : plan.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {showPurchaseModal && selectedPlan && (
                    <div className="pc-modal-backdrop" onClick={() => setShowPurchaseModal(false)}>
                        <div className="pc-modal" onClick={e => e.stopPropagation()}>
                            <div className="pc-modal-header">
                                <div>
                                    <div className="plan-chip">{selectedPlan.name}</div>
                                    <h4 className="modal-title">Unlock {selectedPlan.name} Access</h4>
                                </div>
                                <button className="pc-modal-close" onClick={() => setShowPurchaseModal(false)}>×</button>
                            </div>
                            <div className="pc-modal-body">
                                <div className="price-block">
                                    <div className="price-amount">₹{getPrice(selectedPlan)}</div>
                                    <div className="price-duration">{billing === 'monthly' ? '/month' : billing === 'quarterly' ? '/quarter' : '/year'}</div>
                                </div>
                                <div className="plan-features">
                                    <strong>Includes:</strong>
                                    <ul>
                                        {selectedPlan.features.map((f, i) => <li key={i}>{f}</li>)}
                                    </ul>
                                </div>
                            </div>
                            <div className="pc-modal-footer">
                                <button className="btn btn-outline-secondary" onClick={() => setShowPurchaseModal(false)}>Cancel</button>
                                <button className="btn btn-purchase" onClick={handleRazorpayPayment}>Purchase & Unlock</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default PremiumService;