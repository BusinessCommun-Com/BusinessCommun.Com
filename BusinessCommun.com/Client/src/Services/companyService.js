import api from "./api";

export const registerCompany = async (formData) => {
    try {
        const userId = localStorage.getItem("userId");
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


        const response = await api.post("companies/register", payload);
        return response.data;
    } catch (error) {
        console.error("Error registering company:", error);
        throw error;
    }
}
