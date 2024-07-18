import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ role, children }) => {
    const { user, role: userRole, isLoading } = useAuth();

    if (isLoading) {
        return (
        <div class="loader-container">
            <div class="bouncing-dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
        )
    }

    if (!user) {
        return <Navigate to="/auth/login" />;
    }

    if (role && userRole !== role) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
