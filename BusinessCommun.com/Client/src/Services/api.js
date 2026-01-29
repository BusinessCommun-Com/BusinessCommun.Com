import axios from "axios";
import { toast } from "react-toastify";

// Backend Base URL
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

//Attach JWT token automatically for every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

//Handle sessin expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 || error.response.status === 403) {
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