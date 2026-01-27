import { getDomains, getOrgTypes } from "../../../../Services/utilService";
import { useState, useRef, useEffect } from "react";
import { FaBuilding, FaReceipt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { FaIndustry } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { FaRegBuilding } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaCity } from "react-icons/fa";
import { FaMap } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup"; // To connect Yup validation with React Hook Form
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Comp_Detail_Form.css";
// import { useNavigate } from "react-router-dom";
import useMultiStepForm from "../../../../store/useMultiStepForm";

function CompanyDetail() {
  const [companyLogoUrl, setCompanyLogoUrl] = useState(null);
  const [domains, setDomains] = useState([]);
  const [organizationTypes, setOrganizationTypes] = useState([]);
  const [preview, setPreview] = useState(null);
  const dateInputRef = useRef(null);

  const schema = yup.object({
    organization_name: yup
      .string()
      .required("Organization name is required")
      .max(2000),
    owner_name: yup
      .string()
      .required("Owner name is required")
      .max(255),
    mob_no: yup
      .string()
      .required("Mobile Number is required")
      .test(
        "is-valid-phone",
        "Enter a valid mobile number (7 to 15 digits)",
        (value) => {
          if (!value) return false;
          const digits = value.replace(/\D/g, "");
          return digits.length >= 7 && digits.length <= 15;
        }
      ),
    domain_name: yup
      .string()
      .required("Domain Name must be selected")
      .nullable(),
    org_type: yup
      .string()
      .required("Organization type must be selected")
      .max(100),
    gst_no: yup
      .string()
      .required("GSTIN is required")
      .matches(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        "Invalid GST number"
      ),
    revenue: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : Number(originalValue)
      )
      .typeError("Revenue must be a valid number")
      .required("Revenue is required")
      .min(0, "Revenue cannot be negative")
      .max(1000000000, "Revenue seems too high"),
    address: yup
      .string()
      .required("Address is required")
      .max(200),
    city: yup
      .string()
      .required("City is required")
      .max(100),
    state: yup
      .string()
      .required("State is required")
      .max(100),
    comp_logo_url: yup
      .mixed()
      .required("Logo is required"),
    establishment_year: yup
      .date()
      .typeError("Invalid date")
      .max(new Date(), "Date cannot be in future")
      .required("Establishment year is required"),
  });

  const {
    register, // connects input fields to form
    handleSubmit, // handles submit event
    reset, // resets form fields
    formState: { errors }, // tracks validation errors
    setValue, // used for non-native input fields which come from custom library
    getValues,
  } = useForm({
    resolver: yupResolver(schema), // connect yup validation
  });

  const onSubmit = (data) => {
    // will later connect backend API
    // console.log("Form Submitted Data:", data);
    updateForm({ ...data, comp_logo_url_preview: preview }); // save to Zustand store
    nextStep(); // move to next step
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // show image preview
    }
  };

  const handleIconClick = () => {
    dateInputRef.current.showPicker(); // Native date picker trigger
  };

  const handleDateChange = (e) => {
    setValue("establishment_year", e.target.value);
  };

  const handleCircleClick = () => {
    document.getElementById("orgLogoInput").click();
  };

  const { nextStep, updateForm, formData } = useMultiStepForm();

  useEffect(() => {
    // Load Data
    const fetchData = async () => {
      const d = await getDomains();
      const o = await getOrgTypes();
      setDomains(d);
      setOrganizationTypes(o);
    };
    fetchData();

    if (formData && Object.keys(formData).length > 0) {
      reset(formData); // restore saved values
      if (formData.comp_logo_url_preview) {
        setPreview(formData.comp_logo_url_preview); // restore image preview
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  return (
    <div className="pc-card comp-form-container">
      <h2 className="pc-title">Register your firm</h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="pc-form" noValidate>
        {/* Orginization logo */}
        <div className="pc-label">
          <div style={{ justifyItems: "center" }}>
            {/* Circle Container */}
            <div
              onClick={handleCircleClick}
              style={{
                position: "relative",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                border: "2px dashed #888",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                overflow: "hidden",
                backgroundColor: "#b8bdb5",
                marginTop: "10px",
              }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Organization Logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <FaCamera style={{ fontSize: "28px", color: "#555" }} />
              )}
            </div>

            <input
              id="orgLogoInput"
              type="file"
              accept="image/*"
              {...register("comp_logo_url")}
              onChange={(e) => {
                handleFileChange(e);
                setValue("comp_logo_url", e.target.files);
              }}
              style={{ display: "none" }}
            />

            {/* Error Message */}
            {errors.comp_logo_url && (
              <p className="pc-error">{errors.comp_logo_url.message}</p>
            )}
          </div>
        </div>

        {/* Orginization Field */}
        <label className="pc-label">
          Organization Name
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaBuilding
              style={{
                position: "absolute",
                left: "10px",
                fontSize: "18px",
              }}
            />

            <input
              {...register("organization_name")}
              type="text"
              className={`pc-input ${errors.organization_name ? "pc-error-field" : ""
                }`}
              placeholder="Enter Organization Name..."
            />
          </div>
          {errors.organization_name && (
            <p className="pc-error">{errors.organization_name.message}</p>
          )}
        </label>

        {/* Owner Name */}
        <label className="pc-label">
          Owner Name
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaUser
              style={{
                position: "absolute",
                left: "10px",
                fontSize: "18px",
              }}
            />

            <input
              {...register("owner_name")}
              type="text"
              className={`pc-input ${errors.owner_name ? "pc-error-field" : ""
                }`}
              placeholder="Enter Organization Name..."
            />
          </div>
          {errors.owner_name && (
            <p className="pc-error">{errors.owner_name.message}</p>
          )}
        </label>

        {/* Mobile Number */}
        <label className="pc-label">
          Mobile Number
          <div style={{ position: "relative" }}>
            <PhoneInput
              country={"in"} // default country (🇮🇳)
              className="phone-input-wrapper"
              inputStyle={{
                height: "45px",
                background: "#ffffff",
                border: "1px solid rgba(130, 170, 255, 0.3)",
                borderRadius: "10px",
                padding: "10px 35px !important",
                fontSize: "15px",
                color: "#001f3f",
                marginTop: "6px",
                transition: "border 0.2s, background 0.2s",
                width: "100%",
                boxSizing: "border-box",
              }}
              buttonStyle={{
                border: "none",
                background: "transparent",
                color: "#001f3f",
              }}
              containerStyle={{
                width: "100%",
              }}
              // {...register("mob_no")}
              placeholder="Enter mobile number"
              onChange={(value) => setValue("mob_no", value)} // to sync with react-hook-form
            />
          </div>
          {errors.mob_no && <p className="pc-error">{errors.mob_no.message}</p>}
        </label>

        {/* Domain Name */}
        <label className="pc-label">
          Domain Name
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaIndustry
              style={{
                position: "absolute",
                left: "10px",
                fontSize: "18px",
              }}
            />

            <select
              {...register("domain_name", { required: "Domain is required" })}
              className={`pc-input ${errors.domain_name ? "pc-error-field" : ""
                }`}
              style={{
                paddingLeft: "40px",
                width: "100%",
                height: "45px",
                color: "#ffffff !important",
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Select Domain
              </option>
              {domains.map((domain) => (
                <option key={domain.id} value={domain.id}>
                  {domain.name}
                </option>
              ))}
            </select>
          </div>
          {errors.domain_name && (
            <p className="pc-error">{errors.domain_name.message}</p>
          )}
        </label>

        {/* Organization Type */}
        <label className="pc-label">
          Organization Type
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaRegBuilding
              style={{
                position: "absolute",
                left: "10px",
                fontSize: "18px",
              }}
            />

            <select
              {...register("org_type", {
                required: "Organization type is required",
              })}
              className={`pc-input ${errors.org_type ? "pc-error-field" : ""}`}
              style={{ paddingLeft: "40px", width: "100%", height: "45px" }}
              defaultValue=""
            >
              <option value="" disabled>
                Select Organization Type
              </option>
              {organizationTypes.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>
          {errors.org_type && (
            <p className="pc-error">{errors.org_type.message}</p>
          )}
        </label>

        {/* Establishment Year Field */}
        <label className="pc-label">
          Establishment Year
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Calendar Icon */}
            <FaCalendarAlt
              onClick={handleIconClick}
              style={{
                position: "absolute",
                left: "10px",
                color: "#666",
                fontSize: "18px",
                cursor: "pointer",
              }}
            />

            {/* Date Input */}
            <input
              {...register("establishment_year")}
              ref={dateInputRef}
              type="date"
              onChange={handleDateChange}
              className={`pc-input ${errors.establishment_year ? "pc-error-field" : ""
                }`}
              style={{
                paddingLeft: "35px", // space for icon
              }}
              placeholder="Select Date..."
            />
          </div>
          {errors.establishment_year && (
            <p className="pc-error">{errors.establishment_year.message}</p>
          )}
        </label>

        {/* GSTIN No */}
        <label className="pc-label">
          GSTIN No
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaReceipt
              style={{
                position: "absolute",
                left: "10px",
                fontSize: "18px",
              }}
            />

            <input
              {...register("gst_no")}
              type="text"
              className={`pc-input ${errors.gst_no ? "pc-error-field" : ""}`}
              placeholder="Enter GST Number... "
            />
          </div>
          {errors.gst_no && <p className="pc-error">{errors.gst_no.message}</p>}
        </label>

        {/* Revenue Field */}
        <label className="pc-label">
          Revenue
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaDollarSign
              style={{
                position: "absolute",
                left: "10px",
                fontSize: "18px",
              }}
            />

            <input
              {...register("revenue")}
              type="text"
              className={`pc-input ${errors.revenue ? "pc-error-field" : ""}`}
              placeholder="Enter Revenue..."
            />
          </div>
          {errors.revenue && (
            <p className="pc-error">{errors.revenue.message}</p>
          )}
        </label>

        {/* Address Field */}
        <label className="pc-label">
          Address
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaHome
              style={{
                position: "absolute",
                left: "10px",
                fontSize: "18px",
              }}
            />

            <input
              {...register("address")}
              type="text"
              className={`pc-input ${errors.address ? "pc-error-field" : ""}`}
              placeholder="Enter Address..."
            />
          </div>
          {errors.address && (
            <p className="pc-error">{errors.address.message}</p>
          )}
        </label>

        {/* City Field */}
        <label className="pc-label">
          City
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaCity
              style={{
                position: "absolute",
                left: "10px",
                fontSize: "18px",
              }}
            />

            <input
              {...register("city")}
              type="text"
              className={`pc-input ${errors.city ? "pc-error-field" : ""}`}
              placeholder="Enter City..."
            />
          </div>
          {errors.city && <p className="pc-error">{errors.city.message}</p>}
        </label>

        {/* State Field */}
        <label className="pc-label">
          State
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaMap
              style={{
                position: "absolute",
                left: "10px",
                fontSize: "18px",
              }}
            />

            <input
              {...register("state")}
              type="text"
              className={`pc-input ${errors.state ? "pc-error-field" : ""}`}
              placeholder="Enter State..."
            />
          </div>
          {errors.state && <p className="pc-error">{errors.state.message}</p>}
        </label>

        {/* Save Button */}
        <button type="submit" className="pc-btn">
          Next
        </button>
      </form>
    </div>
  );
}

export default CompanyDetail;
