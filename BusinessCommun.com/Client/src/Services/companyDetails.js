import axios from "axios";
import config from "./config";

// Get company details by ID
export const getCompanyDetailsById = async (companyId) => {
  try {
    const response = await axios.get(
      `${config.server}/companies/approved/${companyId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching company details:", error);
    throw error;
  }
};
export const getApprovedCompDetails = async () => {
  try {
    const response = await axios.get(`${config.server}/companies/approved`);
    console.log(response.data);
    return response.data.data || response.data;
  } catch (error) {
    console.error("Error fetching approved companies:", error);
    throw error;
  }
};

// Create new company
export const createCompany = async (companyData) => {
  try {
    const response = await axios.post(
      `${config.server}/companies`,
      companyData,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
};

// Update company details
export const updateCompany = async (companyId, companyData) => {
  try {
    const response = await axios.put(
      `${config.server}/companies/${companyId}`,
      companyData,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating company:", error);
    throw error;
  }
};

// Delete company
export const deleteCompany = async (companyId) => {
  try {
    const response = await axios.delete(
      `${config.server}/companies/${companyId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting company:", error);
    throw error;
  }
};
