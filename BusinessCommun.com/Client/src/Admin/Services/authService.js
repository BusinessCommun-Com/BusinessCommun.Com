import api from "./api";

// Login User
export const loginUser = async (loginData) => {
  const response = await api.post("/users/login", loginData);

  // Backend sends: { status, message, data }
  if (response.data.data.jwt) {
    localStorage.setItem("token", response.data.data.jwt);
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
};
