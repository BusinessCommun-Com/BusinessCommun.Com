import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaClipboardList, FaGraduationCap, FaTools, FaMoneyBillWave, FaPercent, FaPhone } from "react-icons/fa";
import "./Investor_Form.css";
import useMultiStepForm from "../../../../store/useMultiStepForm";

// Zod Schema
const stakesRegex = /^(\d{1,3}%|\d+(\.\d+)?%?)$/;


const schema = z.object({
    requirement: z
        .string()
        .min(10, "Please describe in detail what are your requirements from an investor (min 10 characters)")
        .max(2000)
        .nonempty("Please specify your requirements"),

    min_qualification: z
        .string()
        .max(255)
        .nonempty("Please specify the minimum qualifications required for the Investor"),

    skills: z
        .string()
        .max(500)
        .nonempty("Please specify the skills you expect from the investor"),

    investment_range: z
        .string()
        .max(100)
        .nonempty("Please specify you expected investment range"),

    stakes: z
        .string()
        .regex(stakesRegex, "Enter a valid percentage or numeric value (e.g., 10% or 100000)")
        .nonempty("Please specify the stakes you're offering"),

});


function InvestorConnect() {

    const { prevStep, updateForm } = useMultiStepForm();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });
    const navigate = useNavigate();
    const onSubmit = (data) => {
        updateForm(data);
        alert("Investor details submitted successfully!");
        navigate('/home');
    };

    return (
        <div className="pc-card investor-form-container">
            <h2 className="pc-title">Investor Connect</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="pc-form" noValidate>

                <label className="pc-label">
                    Requirement
                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                        <FaClipboardList
                            style={{
                                position: "absolute",
                                left: "10px",
                                top: "15px",
                                fontSize: "18px",
                            }}
                        />
                        <textarea
                            {...register("requirement")}
                            className={`pc-input ${errors.requirement ? "pc-error-field" : ""}`}
                            rows="4"
                            placeholder="Describe what kind of investor you are looking for"
                            style={{ paddingLeft: "35px" }}
                        />
                    </div>
                    {errors.requirement && (
                        <p className="pc-error">{errors.requirement.message}</p>
                    )}
                </label>

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
                            placeholder="E.g., MBA, B.Tech, or relevant business experience"
                        />
                    </div>
                    {errors.min_qualification && (
                        <p className="pc-error">{errors.min_qualification.message}</p>
                    )}
                </label>

                <label className="pc-label">
                    Required Skills
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
                            placeholder="E.g., finance, sales, business development"
                        />
                    </div>
                    {errors.skills && <p className="pc-error">{errors.skills.message}</p>}
                </label>

                <div className="pc-row">
                    <label className="pc-label pc-half">
                        Investment Range
                        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                            <FaMoneyBillWave
                                style={{
                                    position: "absolute",
                                    left: "10px",
                                    fontSize: "18px",
                                }}
                            />
                            <input
                                {...register("investment_range")}
                                type="text"
                                className={`pc-input ${errors.investment_range ? "pc-error-field" : ""
                                    }`}
                                placeholder="E.g., ₹10,00,000 - ₹15,00,000"
                            />
                        </div>
                        {errors.investment_range && (
                            <p className="pc-error">{errors.investment_range.message}</p>
                        )}
                    </label>

                    <label className="pc-label pc-half">
                        Stakes Offered
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
                                placeholder="E.g., 10% or 15%"
                            />
                        </div>
                        {errors.stakes && (
                            <p className="pc-error">{errors.stakes.message}</p>
                        )}
                    </label>
                </div>

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

export default InvestorConnect;
