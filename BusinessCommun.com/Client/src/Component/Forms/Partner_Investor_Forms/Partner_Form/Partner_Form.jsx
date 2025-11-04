// Importing React and required libraries
import React from "react";
import { useForm } from "react-hook-form"; // For managing form state and validation
import { yupResolver } from "@hookform/resolvers/yup"; // To connect Yup validation with React Hook Form
import * as yup from "yup"; // For form validation rules
import "./PartnerConnect.css"; // CSS styling

// -------------------------
// Create a Validation Schema using Yup
// -------------------------
const phoneRegex = /^[0-9]{10,15}$/; // Valid phone numbers: 10–15 digits

const schema = yup.object({
    requirement: yup
        .string()
        .required("Requirement is required")
        .min(10, "Add more details (min 10 chars)")
        .max(2000),
    min_qualification: yup
        .string()
        .required("Qualification is required")
        .max(255),
    skills: yup.string().required("Skills are required").max(500),
    investment_range: yup
        .string()
        .required("Investment range is required")
        .max(100),
    stakes: yup
        .string()
        .required("Stakes required")
        .matches(
            /^(\d{1,3}%|\d+(\.\d+)?%?)$/,
            "Use percent (e.g., 10% or 10) or number like 100000"
        ),
    contact_phone: yup
        .string()
        .required("Contact phone required")
        .matches(phoneRegex, "Enter valid phone digits (10 - 15 digits)"),
});

// -------------------------
// Component Function
// -------------------------
function PartnerConnect() {
    // Initialize React Hook Form
    const {
        register, // connects input fields to form
        handleSubmit, // handles submit event
        reset, // resets form fields
        formState: { errors }, // tracks validation errors
    } = useForm({
        resolver: yupResolver(schema), // connect yup validation
    });

    // -------------------------
    // Form Submit Handler
    // -------------------------
    const onSubmit = (data) => {
        // will later connect backend API
        console.log("Form Submitted Data:", data);
        alert("Form submitted successfully!");
        reset(); // clear form after submission
    };

    // -------------------------
    // UI (JSX)
    // -------------------------
    return (
        <div className="pc-card">
            <h2 className="pc-title">Partner Connect</h2>

            {/* Form Section */}
            <form onSubmit={handleSubmit(onSubmit)} className="pc-form" noValidate>
                {/* Requirement Field */}
                <label className="pc-label">
                    Requirement
                    <textarea
                        {...register("requirement")}
                        className={`pc-input ${errors.requirement ? "pc-error-field" : ""}`}
                        rows="5"
                        placeholder="Describe the partner role / expectations"
                    />
                    {errors.requirement && (
                        <p className="pc-error">{errors.requirement.message}</p>
                    )}
                </label>

                {/* Minimum Qualification */}
                <label className="pc-label">
                    Minimum Qualification
                    <input
                        {...register("min_qualification")}
                        type="text"
                        className={`pc-input ${errors.min_qualification ? "pc-error-field" : ""
                            }`}
                        placeholder="E.g., MBA, B.Tech, 5+ yrs exp"
                    />
                    {errors.min_qualification && (
                        <p className="pc-error">{errors.min_qualification.message}</p>
                    )}
                </label>

                {/* Desired Skills */}
                <label className="pc-label">
                    Desired Skills
                    <input
                        {...register("skills")}
                        type="text"
                        className={`pc-input ${errors.skills ? "pc-error-field" : ""}`}
                        placeholder="Comma-separated skills (e.g., sales, operations)"
                    />
                    {errors.skills && (
                        <p className="pc-error">{errors.skills.message}</p>
                    )}
                </label>

                {/* Investment Range + Stakes Row */}
                <div className="pc-row">
                    <label className="pc-label pc-half">
                        Investment Range
                        <input
                            {...register("investment_range")}
                            type="text"
                            className={`pc-input ${errors.investment_range ? "pc-error-field" : ""
                                }`}
                            placeholder="E.g., 5L-20L or 500000-2000000"
                        />
                        {errors.investment_range && (
                            <p className="pc-error">{errors.investment_range.message}</p>
                        )}
                    </label>

                    <label className="pc-label pc-half">
                        Stakes
                        <input
                            {...register("stakes")}
                            type="text"
                            className={`pc-input ${errors.stakes ? "pc-error-field" : ""}`}
                            placeholder="E.g., 10% or 0.5"
                        />
                        {errors.stakes && (
                            <p className="pc-error">{errors.stakes.message}</p>
                        )}
                    </label>
                </div>

                {/* Save Button */}
                <div className="pc-actions">
                    <button type="submit" className="pc-btn pc-btn-primary">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

// Exporting component for use in App.jsx or elsewhere
export default PartnerConnect;
