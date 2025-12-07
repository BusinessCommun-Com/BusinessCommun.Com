<<<<<<< Updated upstream
=======
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./Investor_Form.css";

// Zod Schema
const phoneRegex = /^[0-9]{10}$/;
const stakesRegex = /^(\d{1,3}%|\d+(\.\d+)?%?)$/;

const schema = z.object({
    requirement: z
        .string()
        .min(10, "Please describe in detail what are your requirements from an investor (min 10 characters)")
        .max(2000),

    min_qualification: z
        .string()
        .min(1, "Please specify the minimum qualifications required for the Investor")
        .max(255),

    skills: z
        .string()
        .min(1, "Please specify the skills you expect from the investor")
        .max(500),

    investment_range: z
        .string()
        .min(1, "Please specify you expected investment range")
        .max(100),

    stakes: z
        .string()
        .min(1, "Please specify the stakes you're offering")
        .regex(stakesRegex, "Enter a valid percentage or numeric value (e.g., 10% or 100000)"),

    contact_phone: z
        .string()
        .min(1, "Contact number is required")
        .regex(phoneRegex, "Enter a valid 10-digit phone number"),
});


function InvestorConnect() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    //submit handler of investor requirements
    const onSubmit = (data) => {
        console.log("Investor Requirement Form Submitted :", data);
        alert("Investor details submitted successfully!");
        reset();
    };

    return (
        <div className="pc-card">
            <h2 className="pc-title">Investor Connect</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="pc-form" noValidate>

                <label className="pc-label">
                    Requirement
                    <textarea
                        {...register("requirement")}
                        className={`pc-input ${errors.requirement ? "pc-error-field" : ""}`}
                        rows="4"
                        placeholder="Describe what kind of investor you are looking for"
                    />
                    {errors.requirement && (
                        <p className="pc-error">{errors.requirement.message}</p>
                    )}
                </label>

                <label className="pc-label">
                    Minimum Qualification
                    <input
                        {...register("min_qualification")}
                        type="text"
                        className={`pc-input ${errors.min_qualification ? "pc-error-field" : ""
                            }`}
                        placeholder="E.g., MBA, B.Tech, or relevant business experience"
                    />
                    {errors.min_qualification && (
                        <p className="pc-error">{errors.min_qualification.message}</p>
                    )}
                </label>

                <label className="pc-label">
                    Required Skills
                    <input
                        {...register("skills")}
                        type="text"
                        className={`pc-input ${errors.skills ? "pc-error-field" : ""}`}
                        placeholder="E.g., finance, sales, business development"
                    />
                    {errors.skills && <p className="pc-error">{errors.skills.message}</p>}
                </label>

                <div className="pc-row">
                    <label className="pc-label pc-half">
                        Investment Range
                        <input
                            {...register("investment_range")}
                            type="text"
                            className={`pc-input ${errors.investment_range ? "pc-error-field" : ""
                                }`}
                            placeholder="E.g., ₹10,00,000 - ₹15,00,000"
                        />
                        {errors.investment_range && (
                            <p className="pc-error">{errors.investment_range.message}</p>
                        )}
                    </label>

                    <label className="pc-label pc-half">
                        Stakes Offered
                        <input
                            {...register("stakes")}
                            type="text"
                            className={`pc-input ${errors.stakes ? "pc-error-field" : ""}`}
                            placeholder="E.g., 10% or 15%"
                        />
                        {errors.stakes && (
                            <p className="pc-error">{errors.stakes.message}</p>
                        )}
                    </label>
                </div>

                <label className="pc-label">
                    Contact Phone
                    <input
                        {...register("contact_phone")}
                        type="text"
                        className={`pc-input ${errors.contact_phone ? "pc-error-field" : ""
                            }`}
                        placeholder="Enter your contact number"
                    />
                    {errors.contact_phone && (
                        <p className="pc-error">{errors.contact_phone.message}</p>
                    )}
                </label>

                <div className="pc-actions">
                    <button type="submit" className="pc-btn pc-btn-primary">
                        Finish
                    </button>
                </div>
            </form>
        </div>
    );
}

export default InvestorConnect;
>>>>>>> Stashed changes
