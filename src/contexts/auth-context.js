import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import { setUserCrendIntoLocalStorage } from "../services/local-storage";
import { useSelector } from "react-redux";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const auth = useSelector((state) => state.auth);

    const login = (userInfo) => {
        setUserCrendIntoLocalStorage(userInfo);
        setUser(userInfo);
    };

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem("user"); // optional cleanup
    }, []);

    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            const now = Date.now() / 1000;
            return now > decoded.exp; // ✅ expired if exp < now
        } catch (err) {
            return true; // treat invalid token as expired
        }
    };

    useEffect(() => {
        const token = auth?.auth?.token; // assuming auth.auth is the raw JWT string
        if (token && !isTokenExpired(token)) {
            setUser(token);
        } else {
            logout();
        }
    }, [auth, logout]);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!user && !isTokenExpired(auth.auth.token),
                isTokenExpired,
                auth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
