import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Utiliser l'importation nommée

export const AuthContext = createContext({
    user: null,
    handleRegistration: () => {},
    handleLogin: (token, role) => {},
    handleLogout: () => {}
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("userRole");
        if (token) {
            const decodedUser = jwtDecode(token);
            setUser(decodedUser);
        }
    }, []);

     // Fonction pour gérer la connexion de l'utilisateur
    const handleLogin = (token, role) => {
        const decodedUser = jwtDecode(token);
        localStorage.setItem("userId", decodedUser.sub);
        localStorage.setItem("userRole", role);
        localStorage.setItem("token", token);
        setUser(decodedUser);
    };

    // Fonction pour gérer la déconnexion de l'utilisateur
    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
        setUser(null);
    };

     // Fonction pour gérer l'inscription d'un nouvel utilisateur
    const handleRegistration = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleRegistration, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
