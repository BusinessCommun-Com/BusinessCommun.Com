import api from "./api";


// USER SIDE 

//Company Registration
export const registerCompany = async (companyData) => {
  const response = await api.post("/companies/register", companyData);
  return response.data;
};

// Homepage Approved Companies List
export const fetchApprovedCompanies = async () => {
  const response = await api.get("/companies/approved");
  return response.data.data; // wrapper → data
};



// ADMIN SIDE 

// Fetch All Companies
export const fetchAllCompanies = async () => {
  const response = await api.get("/admin/companies");
  return response.data.data;
};

// Pending Requests
export const fetchPendingCompanies = async () => {
  const response = await api.get("/admin/companies/pending");
  return response.data.data;
};

//Approved Companies
export const fetchAdminApprovedCompanies = async () => {
  const response = await api.get("/admin/companies/approved");
  return response.data.data;
};

// Rejected Companies
export const fetchRejectedCompanies = async () => {
  const response = await api.get("/admin/companies/rejected");
  return response.data.data;
};

// Deleted Companies
export const fetchDeletedCompanies = async () => {
  const response = await api.get("/admin/companies/deleted");
  return response.data.data;
};



// Approve Company
export const approveCompany = async (id) => {
  const response = await api.put(`/admin/companies/approve/${id}`);
  return response.data;
};

// Reject Company
export const rejectCompany = async (id) => {
  const response = await api.put(`/admin/companies/reject/${id}`);
  return response.data;
};



// Soft Delete Company
export const deleteCompany = async (id) => {
  const response = await api.delete(`/admin/companies/${id}`);
  return response.data;
};

// Restore Company
export const restoreCompany = async (id) => {
  const response = await api.put(`/admin/companies/restore/${id}`);
  return response.data;
};

// Permanent Delete
export const permanentDeleteCompany = async (id) => {
  const response = await api.delete(`/admin/companies/permanent/${id}`);
  return response.data;
};

//Fetch Company By ID
export const fetchCompanyById = async (id) => {
  const res = await api.get(`/admin/companies/${id}`);
  return res.data.data;
};
