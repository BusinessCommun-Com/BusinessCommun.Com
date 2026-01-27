import axios from "axios";
import config from "./config";

const BASE_URL = `${config.server}/utils/domains`;

export const getOrganisationDomains = async () => {
    try {
        const response = await axios.get(BASE_URL);
        if (response.data && response.data.status === "success") {
            return response.data.data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching organisation domains:", error);
        return [];
    }
};
