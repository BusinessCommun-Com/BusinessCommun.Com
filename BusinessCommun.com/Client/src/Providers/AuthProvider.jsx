import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  // restore token header if present
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token)
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   }, []);

  // persist user to localStorage when changed
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;

export function useAuth() {
  return useContext(AuthContext);
}
