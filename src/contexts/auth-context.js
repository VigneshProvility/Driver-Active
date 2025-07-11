import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (user) => {
        const decoded = jwtDecode(user.token);
        setUser(decoded);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const logout = useCallback(() => {
        localStorage.removeItem('userCredentials');
        setUser(null);
    });

    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            const now = Date.now() / 1000;
            return decoded.exp < now;
        } catch (err) {
            return true;
        }
    };

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('userCredentials'));
        if (token && !isTokenExpired(token.token)) {
            setUser(jwtDecode(token.token));
        } else {
            logout();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
