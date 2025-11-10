import react, { useState, useRef } from "react"
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

function CompanyDetail() {

    const [companyLogoUrl, setCompanyLogoUrl] = useState(null);
    const [domains, setDomains] = useState(["Arts", "Mobile & Tech"]);
    const [organizationTypes, setOrganizationTypes] = useState([{ id: 1, org_name: "PartnerShip" }, { id: 2, org_name: "Sole Proprietary" }]);
    const [preview, setPreview] = useState(null);
    const dateInputRef = useRef(null);

    const schema = yup.object({
        organization_name: yup
            .string()
            .required("Organization is required")
            .min(10, "Add more details (min 10 chars)")
            .max(2000),
        owner_name: yup
            .string()
            .required("Qualification is required")
            .max(255),
        mob_no: yup.number().required("Mobile Number is required").max(18),
        domain_name: yup
            .string()
            .required("Domain Name must be selected")
            .max(100),
        org_type: yup
            .string()
            .required("Organization type must be selected")
            .max(100),
        gst_no: yup
            .string()
            .required("Gst no. is required")
            .max(100),
        revenue: yup
            .number()
            .required("Revenue is required")
            .max(100),
        address: yup
            .number()
            .required("Revenue is required")
            .max(100),
        city: yup
            .number()
            .required("Revenue is required")
            .max(100),
        state: yup
            .number()
            .required("Revenue is required")
            .max(100),
        comp_logo_url: yup
            .string()
            .required("file is required")
            .max(100),
        establishment_year: yup
            .string()
            .required("Date is required")
            .max(100),

        // contact_phone: yup
        //     .string()
        //     .required("Contact phone required")
        //     .matches(phoneRegex, "Enter valid phone digits (10 - 15 digits)"),
    });

    const {
        register, // connects input fields to form
        handleSubmit, // handles submit event
        reset, // resets form fields
        formState: { errors }, // tracks validation errors
        setValue // used for non-native input fields which come from custom library
    } = useForm({
        resolver: yupResolver(schema), // connect yup validation
    });

    const onSubmit = (data) => {
        // will later connect backend API
        console.log("Form Submitted Data:", data);
        alert("Form submitted successfully!");
        reset(); // clear form after submission
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
        setValue("organization_date", e.target.value);
    };

    const handleCircleClick = () => {
        document.getElementById("orgLogoInput").click();
    };


    return (
        <>
            <div className="pc-card">
                <h2 className="pc-title">Register your firm</h2>

                {/* Form Section */}
                <form onSubmit={handleSubmit(onSubmit)} className="pc-form" noValidate>


                    {/* Orginization logo */}
                    <div className="pc-label">

                        <div style={{justifyItems:"center"}}>

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
                                    backgroundColor: "#f9f9f9",
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

                            {/* Hidden Input */}
                            <input
                                id="orgLogoInput"
                                {...register("comp_logo_url")}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
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
                        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>

                            <FaBuilding
                                style={{
                                    position: "absolute",
                                    left: "10px",
                                    // top: "62%",
                                    // transform: "translateY(-50%)",
                                    // color: "#666",
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
                            {errors.organization_name && (
                                <p className="pc-error">{errors.organization_name.message}</p>
                            )}

                        </div>

                    </label>

                    {/* Owner Name */}
                    <label className="pc-label">
                        Owner Name
                        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>

                            <FaUser
                                style={{
                                    position: "absolute",
                                    left: "10px",
                                    // top: "62%",
                                    // transform: "translateY(-50%)",
                                    // color: "#666",
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
                            {errors.owner_name && (
                                <p className="pc-error">{errors.owner_name.message}</p>
                            )}

                        </div>

                    </label>

                    {/* Mobile Number */}
                    <label className="pc-label">
                        Mobile Number
                        <div style={{ position: "relative" }}>
                            <PhoneInput
                                country={"in"} // default country (🇮🇳)
                                // className="pc-input"
                                inputStyle={{
                                    // width: "100%",
                                    // paddingLeft: "48px", // similar spacing like your icon
                                    // height: "40px",
                                    // borderRadius: "8px",
                                    // border: "1px solid #ccc",
                                    height: "45px",
                                    background: "#0e234a",
                                    border: "1px solid rgba(130, 170, 255, 0.3)",
                                    borderRadius: "10px",
                                    padding: "10px 35px !important",
                                    fontSize: "15px",
                                    color: " #eaf3ff",
                                    marginTop: "6px",
                                    transition: "border 0.2s, background 0.2s",
                                    width: "100%",
                                }}
                                buttonStyle={{
                                    border: "none",
                                    background: "transparent",
                                }}
                                // {...register("mob_no")}
                                placeholder="Enter mobile number"
                                onChange={(value) => setValue("mob_no", value)} // to sync with react-hook-form
                            />
                            {errors.mob_no && (
                                <p className="pc-error">{errors.mob_no.message}</p>
                            )}
                        </div>
                    </label>


                    {/* Domain Name */}
                    <label className="pc-label">
                        Domain Name

                        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                            <FaIndustry
                                style={{
                                    position: "absolute",
                                    left: "10px",
                                    // top: "62%",
                                    // transform: "translateY(-50%)",
                                    // color: "#666",
                                    fontSize: "18px",
                                }}
                            />

                            <select
                                {...register("domain_name", { required: "Domain is required" })}
                                className={`pc-input ${errors.domain_name ? "pc-error-field" : ""}`}
                                style={{ paddingLeft: "40px", width: "100%", height: "40px" }}
                                defaultValue=""
                            >
                                <option value="" disabled>Select Domain</option>
                                {domains.map((domain, i) => (
                                    <option key={i} value={domain}>
                                        {domain}
                                    </option>
                                ))}
                            </select>

                            {errors.domain_name && (
                                <p className="pc-error">{errors.domain_name.message}</p>
                            )}
                        </div>
                    </label>

                    {/* Organization Type */}
                    <label className="pc-label">
                        Organization Type

                        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                            <FaRegBuilding
                                style={{
                                    position: "absolute",
                                    left: "10px",
                                    // top: "62%",
                                    // transform: "translateY(-50%)",
                                    // color: "#666",
                                    fontSize: "18px",
                                }}
                            />

                            <select
                                {...register("domain_name", { required: "Domain is required" })}
                                className={`pc-input ${errors.org_type ? "pc-error-field" : ""}`}
                                style={{ paddingLeft: "40px", width: "100%", height: "40px" }}
                                defaultValue=""
                            >
                                <option value="" disabled>Select Domain</option>
                                {organizationTypes.map((organization, i) => (
                                    <option key={i} value={organization.org_name}>
                                        {organization.org_name}
                                    </option>
                                ))}
                            </select>

                            {errors.org_type && (
                                <p className="pc-error">{errors.org_type.message}</p>
                            )}
                        </div>
                    </label>

                    {/* Establishment Year Field */}
                    <label className="pc-label">
                        Establishment Year
                        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
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
                                className={`pc-input ${errors.establishment_year ? "pc-error-field" : ""}`}
                                style={{
                                    paddingLeft: "35px", // space for icon
                                }}
                                placeholder="Select Date..."
                            />

                            {/* Error Message */}
                            {errors.establishment_year && (
                                <p className="pc-error">{errors.establishment_year.message}</p>
                            )}
                        </div>
                    </label>

                    {/* GSTIN No */}
                    <label className="pc-label">
                        GSTIN No
                        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>

                            <FaReceipt
                                style={{
                                    position: "absolute",
                                    left: "10px",
                                    // top: "62%",
                                    // transform: "translateY(-50%)",
                                    // color: "#666",
                                    fontSize: "18px",
                                }}
                            />

                            <input
                                {...register("gst_no")}
                                type="text"
                                className={`pc-input ${errors.gst_no ? "pc-error-field" : ""
                                    }`}
                                placeholder="Enter GST Number... "
                            />
                            {errors.gst_no && (
                                <p className="pc-error">{errors.gst_no.message}</p>
                            )}

                        </div>

                    </label>

                    {/* Revenue Field */}
                    <label className="pc-label">
                        Revenue
                        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>

                            <FaDollarSign
                                style={{
                                    position: "absolute",
                                    left: "10px",
                                    // top: "62%",
                                    // transform: "translateY(-50%)",
                                    // color: "#666",
                                    fontSize: "18px",
                                }}
                            />

                            <input
                                {...register("revenue")}
                                type="text"
                                className={`pc-input ${errors.revenue ? "pc-error-field" : ""
                                    }`}
                                placeholder="Enter Revenue..."
                            />
                            {errors.revenue && (
                                <p className="pc-error">{errors.revenue.message}</p>
                            )}

                        </div>

                    </label>

                    {/* Address Field */}
                    <label className="pc-label">
                        Address
                        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>

                            <FaHome
                                style={{
                                    position: "absolute",
                                    left: "10px",
                                    // top: "62%",
                                    // transform: "translateY(-50%)",
                                    // color: "#666",
                                    fontSize: "18px",
                                }}
                            />

                            <input
                                {...register("address")}
                                type="text"
                                className={`pc-input ${errors.address ? "pc-error-field" : ""
                                    }`}
                                placeholder="Enter Address..."
                            />
                            {errors.address && (
                                <p className="pc-error">{errors.address.message}</p>
                            )}

                        </div>

                    </label>

                    {/* City Field */}
                    <label className="pc-label">
                        City
                        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>

                            <FaCity
                                style={{
                                    position: "absolute",
                                    left: "10px",
                                    // top: "62%",
                                    // transform: "translateY(-50%)",
                                    // color: "#666",
                                    fontSize: "18px",
                                }}
                            />

                            <input
                                {...register("city")}
                                type="text"
                                className={`pc-input ${errors.city ? "pc-error-field" : ""
                                    }`}
                                placeholder="Enter City..."
                            />
                            {errors.city && (
                                <p className="pc-error">{errors.city.message}</p>
                            )}

                        </div>

                    </label>


                    {/* State Field */}
                    <label className="pc-label">
                        State
                        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>

                            <FaMap
                                style={{
                                    position: "absolute",
                                    left: "10px",
                                    // top: "62%",
                                    // transform: "translateY(-50%)",
                                    // color: "#666",
                                    fontSize: "18px",
                                }}
                            />

                            <input
                                {...register("state")}
                                type="text"
                                className={`pc-input ${errors.state ? "pc-error-field" : ""
                                    }`}
                                placeholder="Enter State..."
                            />
                            {errors.state && (
                                <p className="pc-error">{errors.state.message}</p>
                            )}

                        </div>

                    </label>


                    {/* Save Button */}
                    <div className="pc-actions">
                        <button type="submit" className="pc-btn pc-btn-primary">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CompanyDetail; 