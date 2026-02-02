import api from "./api";

export const registerCompany = async (formData, authUserId = null) => {
    try {
        let userId = authUserId;
        if (!userId) {
            const userStr = localStorage.getItem("user");
            if (userStr) {
                const userObj = JSON.parse(userStr);
                userId = userObj.id;
            }
        }

        if (!userId) {
            throw new Error("User not logged in or cookie issue");
        }

        const payload = {
            userId: parseInt(userId),
            // Company Details
            name: formData.organization_name,
            ownerName: formData.owner_name,
            mobileNumber: formData.mob_no,
            domainId: parseInt(formData.domain_name),
            orgTypeId: parseInt(formData.org_type),
            gstNo: formData.gst_no,
            revenue: parseFloat(formData.revenue),
            address: formData.address,
            city: formData.city,
            state: formData.state,
            establishmentYear: formData.establishment_year ? new Date(formData.establishment_year).getFullYear() : null,
            // logoUrl: will be handled separately for file upload

            // Pitch Details
            title: formData.pitch,
            description: formData.description,
            website: formData.websiteUrl,
            // productImageUrl: will be handled separately for file upload
            // Prevent FileList from being sent as String
            productImage: null,
            logoUrl: null,

            // Connect Type
            connectType: formData.userConnectType, // "partner" or "investor"

            // Connect Details
            requirement: formData.requirement,
            minimumQualification: formData.minimumQualification,
            skills: formData.skills,
            equityPercentage: formData.equityPercentage,
            investmentRange: formData.investmentRange || null, // Only for investor
        };
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No authentication token found. Please login again.");
        }

        // Create FormData
        const formDataToSend = new FormData();

        console.log("=== Sending Registration Data ===");
        console.log("Input comp_logo_url:", formData.comp_logo_url);
        console.log("Input images:", formData.images);

        // Append Logo
        if (formData.comp_logo_url) {
            if (formData.comp_logo_url instanceof FileList && formData.comp_logo_url.length > 0) {
                formDataToSend.append('logo', formData.comp_logo_url[0]);
                console.log("Attached Logo (FileList)");
            } else if (formData.comp_logo_url[0] instanceof File) {
                // Sometimes it comes as an array of files or object with index 0
                formDataToSend.append('logo', formData.comp_logo_url[0]);
                console.log("Attached Logo (Array/Object)");
            } else if (formData.comp_logo_url instanceof File) {
                formDataToSend.append('logo', formData.comp_logo_url);
                console.log("Attached Logo (Single File)");
            }
        }

        // Append Product Images
        if (formData.images) {
            // Convert to array if it is a FileList
            const imageFiles = formData.images instanceof FileList
                ? Array.from(formData.images)
                : (Array.isArray(formData.images) ? formData.images : [formData.images]);

            let count = 0;
            imageFiles.forEach((file, index) => {
                if (file instanceof File) {
                    formDataToSend.append('productImages', file);
                    count++;
                } else {
                    console.warn(`Skipping item at index ${index}: Not a File object`, file);
                }
            });
            console.log(`Attached ${count} product images`);
        }

        // Append JSON Data
        formDataToSend.append('data', JSON.stringify(payload));


        const response = await api.post("companies/register", formDataToSend, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error registering company:", error);
        throw error;
    }
}



export const getMyCompanyDetails = async () => {
    try {
        const response = await api.get("companies/my-company");
        return response.data;
    } catch (error) {
        console.error("Error fetching my company:", error);
        throw error;
    }
}

export const updateCompany = async (id, formData) => {
    try {
        const formDataToSend = new FormData();

        // 1. Prepare JSON Payload (exclude ID and other potential junk)
        const { id: _, ...restOfFormData } = formData;
        const payload = {
            ...restOfFormData,
            userId: formData.userId ? parseInt(formData.userId) : null,
            domainId: formData.domainId ? parseInt(formData.domainId) : null,
            orgTypeId: formData.orgTypeId ? parseInt(formData.orgTypeId) : null,
            revenue: typeof formData.revenue === 'string' ? parseFloat(formData.revenue.replace(/,/g, '')) : formData.revenue,
            establishmentYear: formData.establishmentYear,
            // These will be overridden by file uploads if present
            logoUrl: formData.logoUrl,
            productImageUrls: formData.productImageUrls
        };

        // 2. Append JSON data
        formDataToSend.append('data', JSON.stringify(payload));

        // 3. Append Logo if it's a new file
        if (formData.newLogoFile) {
            formDataToSend.append('logo', formData.newLogoFile);
        }

        // 4. Append New Product Images
        if (formData.newProductImages && formData.newProductImages.length > 0) {
            formData.newProductImages.forEach(file => {
                formDataToSend.append('productImages', file);
            });
        }

        const response = await api.put(`companies/update/${id}`, formDataToSend, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating company:", error);
        throw error;
    }
}

export const deleteCompany = async (id) => {
    try {
        const response = await api.delete(`companies/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting company:", error);
        throw error;
    }
}
