import api from "./api";

//Fetch All Admins
export const fetchAdmins = async () => {
  const res = await api.get("/admin/admins");
  return res.data.data;
};

//Remove Admin (Demote Role)
export const removeAdmin = async (id) => {
  const res = await api.put(`/admin/admins/remove/${id}`);
  return res.data;
};
