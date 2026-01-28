import api from "./api";
import axios from "axios";

// Login User
export const loginUser = async (loginData) => {
  const response = await api.post("/users/login", loginData);

  // Backend sends: { status, message, data } and token is at response.data.data.token
  const token = response?.data?.data?.token;
  if (token) {
    localStorage.setItem("token", token);
    // set defaults so other axios calls include the Authorization header
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return response.data;
};

// Register User
export const registerUser = async (registerData) => {
  const response = await api.post("/users/register", registerData);
  return response.data;
};

//Logout Helper
export const logoutUser = () => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  delete api.defaults.headers.common["Authorization"];
};
