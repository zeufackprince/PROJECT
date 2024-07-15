import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Importation nommée de la fonction jwtDecode

export const AuthContext = createContext({
    user: null,
    role: null,
    handleRegistration: () => {},
    handleLogin: (token, role) => {},
    handleLogout: () => {}
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedRole = localStorage.getItem("userRole");
        if (token) {
            const decodedUser = jwtDecode(token);
            setUser(decodedUser);
            setRole(storedRole);
        }
    }, []);

    const handleLogin = (token, role) => {
        const decodedUser = jwtDecode(token);
        localStorage.setItem("userEmail", decodedUser.sub);
        localStorage.setItem("userId", decodedUser.exp)
        localStorage.setItem("userRole", role);
        localStorage.setItem("token", token);
        setUser(decodedUser);
        setRole(role);
    };

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
        localStorage.removeItem("userId")
        setUser(null);
        setRole(null);
    };

    const handleRegistration = () => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
        setUser(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ user, role, handleLogin, handleRegistration, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
