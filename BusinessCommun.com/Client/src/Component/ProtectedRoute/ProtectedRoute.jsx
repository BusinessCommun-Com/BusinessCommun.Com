import { Navigate } from "react-router-dom";
import { useAuth } from "../../Providers/AuthProvider";

export const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    console.log("ProtectedRoute - user:", user);
    if (!user) {
        console.log("User not authenticated, redirecting to login.");
        return <Navigate to="/login" replace />;
    }
    return children;
};