import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

// const AuthContext = createContext();
export const AuthContext = createContext({
	user: null,
	handleRegistration: (token) => {},
	handleLogin: (token) => {},
	handleLogout: () => {}
})


export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	const handleLogin = (token, role) => {
		const decodedUser = jwtDecode(token)
		localStorage.setItem("userId", decodedUser.sub)
		localStorage.setItem("userRole", role)
		localStorage.setItem("token", token)
		setUser(decodedUser)
	}

	const handleLogout = () => {
		localStorage.removeItem("userId")
		localStorage.removeItem("userRole")
		localStorage.removeItem("token")
		setUser(null)
	}

	const handleRegistration = () => {

		localStorage.removeItem("userId")
		localStorage.removeItem("userRole")
		localStorage.removeItem("token")
		setUser(null)
	}

    // const getRole = () => auth.role;

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleRegistration, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
