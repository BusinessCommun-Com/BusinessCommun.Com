import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./Pitch_Detail_Form.css";
import useMultiStepForm from "../../../../store/useMultiStepForm";
import { useEffect, useState } from "react";
import { FaTimes, FaBullhorn, FaAlignLeft, FaImages, FaGlobe } from "react-icons/fa";


const schema = z.object({
    pitch: z.string().min(10, "Minimum 10 characters required").max(500, "Maximum 500 characters allowed"),
    description: z.string().min(20, "Minimum 20 characters required").max(5000, "Maximum 5000 characters allowed"),
    images: z.any().optional(),
    website: z.string()
        .optional()
        .refine((val) => {
            if (!val || val.trim() === "") return true;
            try {
                return z.string().url().safeParse(val.trim()).success;
            } catch {
                return false;
            }
        }, {
            message: "Please enter a valid URL (e.g., https://example.com)"
        }),
});



function CompanyPitch() {
    const { prevStep, nextStep, updateForm, choosePath, formData } = useMultiStepForm();
    const [imagePreviews, setImagePreviews] = useState([]);
    const [pitchLength, setPitchLength] = useState(0);
    const [descriptionLength, setDescriptionLength] = useState(0);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors },
        reset,
        trigger
    } = useForm({
        resolver: zodResolver(schema),
    });

    // Watch pitch and description for character counting
    const pitchValue = watch("pitch") || "";
    const descriptionValue = watch("description") || "";

    useEffect(() => {
        setPitchLength(pitchValue.length);
    }, [pitchValue]);

    useEffect(() => {
        setDescriptionLength(descriptionValue.length);
    }, [descriptionValue]);

    // Restore form data on mount (only once)
    useEffect(() => {
        if (formData && Object.keys(formData).length > 0) {
            reset(formData);
            if (formData.pitch) setPitchLength(formData.pitch.length);
            if (formData.description) setDescriptionLength(formData.description.length);

            // Restore Images
            if (formData.images && formData.images.length > 0) {
                const files = Array.from(formData.images);

                // Priority: Use saved previews if available (matches Company Form logic)
                if (formData.pitch_image_previews && formData.pitch_image_previews.length > 0) {
                    setImagePreviews(formData.pitch_image_previews);
                } else {
                    const previews = files.map(file => ({
                        file,
                        preview: URL.createObjectURL(file), // Fallback regeneration
                        name: file.name
                    }));
                    setImagePreviews(previews);
                }

                // Restore File Input (using setTimeout to ensure DOM is ready)
                setTimeout(() => {
                    const dt = new DataTransfer();
                    files.forEach(file => dt.items.add(file));
                    const input = document.getElementById("imageInput");
                    if (input) {
                        input.files = dt.files;
                        // Force RHF to recognize the files
                        setValue("images", dt.files, { shouldValidate: true, shouldDirty: true });
                        console.log("Restored files in DOM and RHF:", dt.files);
                    }
                }, 100);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const handleImageChange = (e) => {
        const files = Array.from(e.target.files || []);

        // Validate file size (max 5MB per image)
        const maxSize = 5 * 1024 * 1024; // 5MB
        const validFiles = files.filter(file => {
            if (file.size > maxSize) {
                alert(`${file.name} is too large. Maximum size is 5MB.`);
                return false;
            }
            return true;
        });

        // Limit to 5 images
        const filesToProcess = validFiles.slice(0, 5);
        if (validFiles.length > 5) {
            alert("You can upload a maximum of 5 images. Only the first 5 will be selected.");
        }

        setValue("images", e.target.files);

        // Create previews
        const previews = filesToProcess.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            name: file.name
        }));
        setImagePreviews(previews);
    };

    const removeImage = (index) => {
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setImagePreviews(newPreviews);

        // Update file input
        const dataTransfer = new DataTransfer();
        newPreviews.forEach(({ file }) => dataTransfer.items.add(file));
        const fileInput = document.getElementById("imageInput");
        if (fileInput) {
            fileInput.files = dataTransfer.files;
            setValue("images", dataTransfer.files);
        }
    };

    const handleRoleSelect = (role) => {
        return handleSubmit((data) => {
            console.log("Pitch Form Data Submitted:", data);

            // Decouple from RHF input value. Use imagePreviews as the Source of Truth.
            // This ensures exactly what the user SEES is what gets SAVED.
            const imagesArray = imagePreviews.map(p => p.file);
            console.log("Saving images from Previews State:", imagesArray);

            // Store image metadata, data, AND PREVIEWS explicitly
            updateForm({
                ...data,
                images: imagesArray,
                imageCount: imagePreviews.length,
                pitch_image_previews: imagePreviews
            });
            choosePath(role);
        });
    };



    return (

        <div className="pc-card">
            <h2 className="pc-title">Product Pitch</h2>

            <form onSubmit={handleSubmit(() => nextStep())} className="pc-form" noValidate>
                {/* PITCH */}
                <label className="pc-label">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>Short Pitch</span>
                        <span style={{
                            fontSize: "12px",
                            color: pitchLength > 500 ? "#ff6666" : "#666",
                            fontWeight: "normal"
                        }}>
                            {pitchLength}/500
                        </span>
                    </div>
                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                        <FaBullhorn
                            style={{
                                position: "absolute",
                                left: "10px",
                                top: "15px",
                                fontSize: "18px",
                            }}
                        />
                        <textarea
                            {...register("pitch")}
                            className={`pc-input ${errors.pitch ? "pc-error-field" : ""}`}
                            rows="3"
                            placeholder="Write a short pitch about your product (10-500 characters)"
                            maxLength={500}
                            style={{ paddingLeft: "35px" }}
                        />
                    </div>
                    {errors.pitch && <p className="pc-error">{errors.pitch.message}</p>}
                </label>

                {/* DESCRIPTION */}
                <label className="pc-label">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>Description</span>
                        <span style={{
                            fontSize: "12px",
                            color: descriptionLength > 5000 ? "#ff6666" : "#666",
                            fontWeight: "normal"
                        }}>
                            {descriptionLength}/5000
                        </span>
                    </div>
                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                        <FaAlignLeft
                            style={{
                                position: "absolute",
                                left: "10px",
                                top: "15px",
                                fontSize: "18px",
                            }}
                        />
                        <textarea
                            {...register("description")}
                            className={`pc-input ${errors.description ? "pc-error-field" : ""}`}
                            rows="6"
                            placeholder="Explain your product in detail (20-5000 characters)"
                            maxLength={5000}
                            style={{ paddingLeft: "35px" }}
                        />
                    </div>
                    {errors.description && (
                        <p className="pc-error">{errors.description.message}</p>
                    )}
                </label>

                {/* IMAGES */}
                <label className="pc-label">
                    Product Images (Optional - Max 5 images, 5MB each)
                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                        <FaImages
                            style={{
                                position: "absolute",
                                left: "10px",
                                fontSize: "18px",
                            }}
                        />
                        <input
                            id="imageInput"
                            {...register("images")}
                            onChange={(e) => {
                                register("images").onChange(e);
                                handleImageChange(e);
                            }}
                            type="file"
                            multiple
                            accept="image/*"
                            className={`pc-input ${errors.images ? "pc-error-field" : ""}`}
                            style={{ paddingLeft: "35px" }}
                        />
                    </div>
                    {errors.images && (
                        <p className="pc-error">{errors.images.message}</p>
                    )}

                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                            gap: "10px",
                            marginTop: "10px"
                        }}>
                            {imagePreviews.map((item, index) => (
                                <div key={index} style={{ position: "relative" }}>
                                    <img
                                        src={item.preview}
                                        alt={`Preview ${index + 1}`}
                                        style={{
                                            width: "100%",
                                            height: "100px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            border: "1px solid #ddd"
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        style={{
                                            position: "absolute",
                                            top: "5px",
                                            right: "5px",
                                            background: "rgba(255, 0, 0, 0.7)",
                                            border: "none",
                                            borderRadius: "50%",
                                            width: "24px",
                                            height: "24px",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "white"
                                        }}
                                        aria-label="Remove image"
                                    >
                                        <FaTimes size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </label>

                {/* WEBSITE */}
                <label className="pc-label">
                    Website (Optional)
                    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                        <FaGlobe
                            style={{
                                position: "absolute",
                                left: "10px",
                                fontSize: "18px",
                            }}
                        />
                        <input
                            {...register("website")}
                            type="text"
                            className={`pc-input ${errors.website ? "pc-error-field" : ""}`}
                            placeholder="https://yourwebsite.com"
                        />
                    </div>
                    {errors.website && (
                        <p className="pc-error">{errors.website.message}</p>
                    )}
                </label>


            </form>

            {/* SELECTION BUTTONS */}
            <div className="pc-actions" style={{ marginTop: "20px" }}>
                <div className="nav-buttons">

                    <button type="button" className="pc-btn back" onClick={prevStep}>
                        Back
                    </button>

                    <div className="selection-container">
                        <span className="selection-label">Looking for a:</span>
                        <div className="forward-buttons">
                            <button
                                type="button"
                                className="pc-btn"
                                onClick={handleRoleSelect("partner")}
                            >
                                Partner
                            </button>

                            <button
                                type="button"
                                className="pc-btn"
                                onClick={handleRoleSelect("investor")}
                            >
                                Investor
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default CompanyPitch;
