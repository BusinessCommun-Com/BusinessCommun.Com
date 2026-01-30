import api from "./api";

const BASE_URL = "/utils/domains";

export const getOrganisationDomains = async () => {
    try {
        const response = await api.get(BASE_URL);
        if (response.data && response.data.status === "success") {
            return response.data.data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching organisation domains:", error);
        return [];
    }
};
