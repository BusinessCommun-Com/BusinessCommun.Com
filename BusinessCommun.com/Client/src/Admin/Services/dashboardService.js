import api from "./api";

//Summary Cards 
export const fetchDashboardSummary = async () => {
  const response = await api.get("/admin/dashboard/summary");
  return response.data.data;
};

// Recent Activity 
export const fetchRecentActivities = async () => {
  const response = await api.get("/admin/dashboard/activity");
  return response.data.data;
};
