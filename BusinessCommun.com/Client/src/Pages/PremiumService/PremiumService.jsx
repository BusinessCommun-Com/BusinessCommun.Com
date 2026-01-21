import React, { useState } from "react";
import "./PremiumService.css";
import { Link } from "react-router-dom";
import icon2 from '../../assets/UI_Images/icon2.jpg';

const PremiumService = () => {
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

    return (
        <div>
            {/* Header */}
            {/* <header className="header">
                <div className="container">
                    <h1 className="logo">
                        <img src={icon2} alt="BusinessCommun logo" className="logo-img" />
                        BusinessCommun
                    </h1>
                    <nav>
                        <Link to='/home' className="link"> Home </Link>
                        <Link to='/about-us' className="link"> About Us </Link>
                        <Link to='/contact-us' className="link"> Contact </Link>
                    </nav>
                </div>
            </header> */}

            {/* Hero */}
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
                            >
                                {plan.popular && <div className="badge">Most Popular</div>}
                                <h3>{plan.name}</h3>
                                <p className="tagline">{plan.tagline}</p>

                                <p className="price">
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

                                <button className="cta-btn">{plan.buttonText}</button>
                            </div>
                        ))}

                    </div>
                </section>
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
