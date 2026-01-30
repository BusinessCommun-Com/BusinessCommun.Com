// Importing React and required libraries
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // For managing form state and validation
import { yupResolver } from "@hookform/resolvers/yup"; // To connect Yup validation with React Hook Form
import * as yup from "yup"; // For form validation rules
import { FaClipboardList, FaGraduationCap, FaTools, FaMoneyBillWave, FaPercent, FaPhone } from "react-icons/fa";
import "./Partner_Form.css"; // CSS styling
import useMultiStepForm from "../../../../store/useMultiStepForm";
import { useEffect } from "react";
import { registerCompany } from "../../../../Services/companyService";
import { toast } from "react-toastify";

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
  stakes: yup
    .string()
    .required("Stakes required")
    .matches(
      /^(\d{1,3}%|\d+(\.\d+)?%?)$/,
      "Use percent (e.g., 10% or 10) or number like 100000"
    ),
});

// -------------------------
// Component Function
// -------------------------
function PartnerConnect() {
  const { prevStep, updateForm, nextStep, formData, resetForm } = useMultiStepForm();
  // Initialize React Hook Form
  const {
    register, // connects input fields to form
    handleSubmit, // handles submit event
    formState: { errors }, // tracks validation errors
    reset
  } = useForm({
    resolver: yupResolver(schema), // connect yup validation
  });

  // -------------------------
  // Form Submit Handler
  // -------------------------
  // const onSubmit = (data) => {
  //     // will later connect backend API
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    updateForm(data); // Save partner form data in the Zustand store
    const allFormData = {
      ...formData,
      ...data,
      minimumQualification: data.min_qualification,
      equityPercentage: data.stakes
    };

    console.log("=== COMPLETE FORM DATA ===");
    console.log(allFormData);
    try {
      const response = await registerCompany(allFormData);

      if (response.status === "success") {
        toast.success("Company registered successfully!");

        // If backend sent a new token (due to role upgrade), update it
        if (response.data) {
          localStorage.setItem("token", response.data);
          // Force reload to apply new token/permissions
          window.location.href = "/home";
          return;
        }

        resetForm(); // Clear stored form data
        navigate('/home');
      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Failed to register company. Please try again.");
      console.error("Registration error:", error);
    }
  };

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      reset(formData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // -------------------------
  // UI (JSX)
  // -------------------------
  return (

    <div className="pc-card partner-form-container">
      <h2 className="pc-title">Partner Connect</h2>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="pc-form"
        noValidate
      >
        {/* Requirement Field */}
        <label className="pc-label">
          Requirement
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <FaClipboardList
              style={{
                position: "absolute",
                left: "10px",
                top: "15px", // Adjust for textarea
                fontSize: "18px",
              }}
            />
            <textarea
              {...register("requirement")}
              className={`pc-input ${errors.requirement ? "pc-error-field" : ""
                }`}
              rows="5"
              placeholder="Describe the partner role / expectations"
              style={{ paddingLeft: "35px" }} // Added padding for icon
            />
          </div>
          {errors.requirement && (
            <p className="pc-error">{errors.requirement.message}</p>
          )}
        </label>

        {/* Minimum Qualification */}
        <label className="pc-label">
          Minimum Qualification
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <FaGraduationCap
              style={{
                position: "absolute",
                left: "10px",
                fontSize: "18px",
              }}
            />
            <input
              {...register("min_qualification")}
              type="text"
              className={`pc-input ${errors.min_qualification ? "pc-error-field" : ""
                }`}
              placeholder="E.g., MBA, B.Tech, 5+ yrs exp"
            />
          </div>
          {errors.min_qualification && (
            <p className="pc-error">{errors.min_qualification.message}</p>
          )}
        </label>

        {/* Desired Skills */}
        <label className="pc-label">
          Desired Skills
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <FaTools
              style={{
                position: "absolute",
                left: "10px",
                fontSize: "18px",
              }}
            />
            <input
              {...register("skills")}
              type="text"
              className={`pc-input ${errors.skills ? "pc-error-field" : ""}`}
              placeholder="Comma-separated skills (e.g., sales, operations)"
            />
          </div>
          {errors.skills && (
            <p className="pc-error">{errors.skills.message}</p>
          )}
        </label>

        {/* Stakes Field (Now full width) */}
        <label className="pc-label">
          Stakes
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <FaPercent
              style={{
                position: "absolute",
                left: "10px",
                fontSize: "18px",
              }}
            />
            <input
              {...register("stakes")}
              type="text"
              className={`pc-input ${errors.stakes ? "pc-error-field" : ""}`}
              placeholder="E.g., 10% or 0.5"
            />
          </div>
          {errors.stakes && (
            <p className="pc-error">{errors.stakes.message}</p>
          )}
        </label>

        {/* Save Button */}
        <div className="pc-actions">
          <button type="button" className="pc-btn" onClick={prevStep}>
            Back
          </button>
          <button type="submit" className="pc-btn pc-btn-primary">
            Finish
          </button>
        </div>

      </form>
    </div>

  );
}

// Exporting component for use in App.jsx or elsewhere
export default PartnerConnect;
