import React, { useState, useEffect } from "react";
import "./PremiumService.css";
import { fetchInvestors, purchasePremium } from '../../Services/premiumService';

const PremiumService = () => {

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const [userId, setUserId] = useState('');
    const [investors, setInvestors] = useState([]);
    const [previewMode, setPreviewMode] = useState(false);
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [loadingInvestors, setLoadingInvestors] = useState(false);
    const [message, setMessage] = useState('');
    const [billing, setBilling] = useState("monthly");

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
            features: [
                "Access to core features",
                "Email support",
                "15 Calls per month",
                "Conference for 5 participants",
            ],
            buttonText: "Get Started",
            popular: false,
        },
        {
            name: "Standard",
            tagline: "Ideal for growing teams",
            monthly: 999,
            quarterly: 2699,
            yearly: 8999,
            features: [
                "Everything in Basic",
                "Priority support",
                "30 Calls per month",
                "Conference for 5 participants"
            ],
            buttonText: "Choose Standard",
            popular: true,
        },
        {
            name: "Premium",
            tagline: "Best for enterprises & large teams",
            monthly: 1999,
            quarterly: 5399,
            yearly: 17999,
            features: [
                "Everything in Standard",
                "Dedicated HR manager",
                "Unlimited Calls",
                "Full Investment Support",
            ],
            buttonText: "Go Premium",
            popular: false,
        },
    ];

    const handleRazorpayPayment = async () => {
        if (!userId) {
            setMessage('Please enter your User ID to proceed');
            return;
        }

        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
            alert("Razorpay SDK failed to load.");
            return;
        }

        try {
            const amount = getPrice(selectedPlan);

            // Call Backend to create order
            const orderRes = await fetch('http://localhost:5000/api/premium/create-razorpay-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount })
            });
            const orderData = await orderRes.json();

            const options = {
                key: "rzp_test_S8YJ78ThpDYRq5", // Move to .env for production
                amount: orderData.amount,
                currency: "INR",
                name: "BusinessCommun",
                description: `Unlock ${selectedPlan.name} Plan`,
                order_id: orderData.id,
                handler: async function (response) {
                    const verifyRes = await fetch('http://localhost:5000/api/premium/verify-payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            ...response,
                            userId,
                            plan: selectedPlan.name,
                            amount
                        })
                    });
                    const result = await verifyRes.json();
                    if (result.status === 'success') {
                        alert("Payment Successful! Premium features unlocked.");
                        window.location.reload();
                    }
                },
                theme: { color: "#2563eb" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            setMessage("Payment initialization failed.");
        }
    };

    return (
        <div className="premium-page">
            <main>
                <section className="hero">
                    <div className="container">
                        <h2>Premium Services</h2>
                        <p>Choose a plan that fits you. Upgrade or cancel anytime.</p>

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
                    </div>
                </section>

                {/* Pricing Cards */}
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

                                <p className="price" style={{ animationDelay: `${index * 90}ms` }}>
                                    <span className="currency">₹</span>
                                    <span className="amount">{getPrice(plan)}</span>
                                    <span className="duration">
                                        {billing === "monthly"
                                            ? "/month"
                                            : billing === "quarterly"
                                                ? "/quarter"
                                                : "/year"}
                                    </span>
                                </p>

                                <ul className="features">
                                    {plan.features.map((f, i) => (
                                        <li key={i}>✔ {f}</li>
                                    ))}
                                </ul>

                                <button
                                    className="cta-btn"
                                    onClick={async () => {
                                        setSelectedPlan(plan);
                                        // attempt to fetch investors (preview if not purchased)
                                        try {
                                            setLoadingInvestors(true);
                                            const data = await fetchInvestors(userId);
                                            setInvestors(data.investors || []);
                                            setPreviewMode(!!data.preview);
                                            setMessage('');
                                            if (data.preview) {
                                                setShowPurchaseModal(true);
                                            }
                                        } catch (err) {
                                            if (err && err.status === 402) {
                                                setInvestors(err.investors || []);
                                                setPreviewMode(true);
                                                setShowPurchaseModal(true);
                                                setMessage('Please purchase to view full details');
                                            } else {
                                                setMessage((err && err.error) || 'Unable to fetch investors');
                                            }
                                        } finally {
                                            setLoadingInvestors(false);
                                        }
                                    }}
                                >
                                    {plan.buttonText}
                                </button>
                            </div>
                        ))}

                    </div>
                </section>

                {/* Investors listing */}
                <section className="pricing-section">
                    <div className="container">
                        <h3 style={{ marginBottom: '12px' }}>Premium Investors</h3>

                        <div className="mb-3">
                            <label className="form-label">Your User ID (simulate login):</label>
                            <input className="form-control" value={userId} onChange={e => setUserId(e.target.value)} placeholder="Enter your user id" />
                        </div>

                        {message && <div className="alert alert-info">{message}</div>}

                        <div className="investors-list">
                            {loadingInvestors && <div>Loading investors...</div>}
                            {!loadingInvestors && investors.length === 0 && <div className="text-muted">No investors to show. Click a plan's action to preview or purchase.</div>}
                            <div className="row">
                                {investors.map((inv, idx) => (
                                    <div key={inv.id} className="col-md-4">
                                        <div className="investor-card" style={{ animationDelay: `${idx * 60}ms` }}>
                                            <div className="investor-top">
                                                <div className="avatar">{(inv.name || '').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}</div>
                                                <div className="investor-meta">
                                                    <h5>{inv.name}</h5>
                                                    <div className="company">{inv.company}</div>
                                                </div>
                                            </div>
                                            {previewMode ? (
                                                <p className="text-muted small mt-2">Contact details visible after purchase</p>
                                            ) : (
                                                <div className="investor-body mt-2">
                                                    <p className="mb-1"><strong>Email:</strong> {inv.email}</p>
                                                    <p className="mb-1"><strong>Phone:</strong> {inv.phone}</p>
                                                    <p className="mb-1"><strong>Notes:</strong> {inv.details}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Purchase Modal */}
                {showPurchaseModal && selectedPlan && (
                    <div className="pc-modal-backdrop" onClick={() => setShowPurchaseModal(false)}>
                        <div className="pc-modal" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
                            <div className="pc-modal-header">
                                <div>
                                    <div className="plan-chip">{selectedPlan.name}</div>
                                    <h4 className="modal-title">Unlock {selectedPlan.name} Access</h4>
                                </div>
                                <button className="pc-modal-close" onClick={() => setShowPurchaseModal(false)} aria-label="Close">×</button>
                            </div>

                            <div className="pc-modal-body">
                                <div className="price-block">
                                    <div className="price-amount">₹{getPrice(selectedPlan)}</div>
                                    <div className="price-duration">{billing === 'monthly' ? '/month' : billing === 'quarterly' ? '/quarter' : '/year'}</div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">User ID</label>
                                    <input className="form-control" value={userId} onChange={e => setUserId(e.target.value)} placeholder="Enter your user id" />
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

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <p>
                        © {new Date().getFullYear()} BusinessCommun. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default PremiumService;
