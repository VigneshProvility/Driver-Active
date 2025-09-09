import { useAuth } from "./contexts/auth-context";
import { useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import ConfirmDialog from "./components/popup";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isTokenExpired, auth } = useAuth();
    const location = useLocation();
    const [showPopup, setShowPopup] = useState(false);

    // track first load
    const isFirstLoad = useRef(true);

    useEffect(() => {
        if (isTokenExpired(auth.auth.token)) {
            if (isFirstLoad.current) {
                // reload/direct access → redirect immediately
                window.location.href = "/login";
            } else {
                // menu click → show popup
                setShowPopup(true);
            }
        }
        isFirstLoad.current = false;
    }, [auth.auth.token, isAuthenticated, isTokenExpired, location]);

    if (showPopup) {
        return (
            <ConfirmDialog
                open={showPopup}
                title="Confirm Action"
                message="Your session has expired. Redirecting to login..."
                onConfirm={() => (window.location.href = "/login")}
                onCancel={() => (window.location.href = "/login")}
            />
        );
    }

    return children;
};

export default ProtectedRoute;
