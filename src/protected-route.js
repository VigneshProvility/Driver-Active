import { useAuth } from "./contexts/auth-context";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>; // Show while checking auth
    //if (!user) return <Navigate to="/login" />; // Redirect to login if not authenticated

    return children; // Authenticated, allow access
};

export default ProtectedRoute;
