import { useAuth } from "./contexts/auth-context";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" />; // Redirect to login if not authenticated

    return children; // Authenticated, allow access
};

export default ProtectedRoute;
