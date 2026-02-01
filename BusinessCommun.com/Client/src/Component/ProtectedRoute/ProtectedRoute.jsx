import { Navigate } from "react-router-dom";
import { useAuth } from "../../Providers/AuthProvider";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  console.log("ProtectedRoute - user:", user);
  if (!user) {
    console.log("User not authenticated, redirecting to login.");
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles) {
    const hasRole = user.roles?.some(role => allowedRoles.includes(role));
    if (!hasRole) {
      console.log("User does not have required role, redirecting to unauthorized.");
      return <Navigate to="/unauthorized" replace />;
    }
  }
  return children;
};
