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


        const response = await api.post("companies/register", payload);
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
        // Need to parse IDs back to integers if they became strings in form
        const payload = {
            ...formData,
            userId: formData.userId ? parseInt(formData.userId) : null,
            domainId: formData.domainId ? parseInt(formData.domainId) : null,
            orgTypeId: formData.orgTypeId ? parseInt(formData.orgTypeId) : null,
            revenue: typeof formData.revenue === 'string' ? parseFloat(formData.revenue.replace(/,/g, '')) : formData.revenue,
            establishmentYear: formData.establishmentYear, // Assuming simple string or number. If date object, handle it.
        };

        const response = await api.put(`companies/update/${id}`, payload);
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
