import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

// Backend Base URL
const api = axios.create({
  baseURL: "http://localhost:8765",
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to check if token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true; // Consider invalid token as expired
  }
};

// Helper function to handle logout
const handleLogout = () => {
  toast.error("Session expired. Please login again.");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.setItem("sessionExpired", "true");
  window.location.href = "/login";
};

//Attach JWT token automatically for every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      // Check if token is expired before adding it to request
      if (isTokenExpired(token)) {
        handleLogout();
        return Promise.reject(new Error("Token expired"));
      }
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

//Handle session expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Show message
      toast.error("Session expired. Please login again.");

      // Remove token
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.setItem("sessionExpired", "true");

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }

    return Promise.reject(error);
  },
);

export default api;
