import { createContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [userType, setUserType] = useState(null);
    const [userName, setUserName] = useState(null);

    const fetchUserType = async (userName) => {
        try {
            const response = await axios.get(`${API_URL}/getUserType?userName=${userName}`, { withCredentials: true });
            if (response.data.isLogin) {
                setIsLogin(true);
                setUserType(response.data.userType);
                setUserName(userName);
                console.log("User is logged in. UserType:", response.data.userType);
            }
        } catch (error) {
            console.error("Error fetching user type:", error);
            setIsLogin(false);
            setUserType(null);
            setUserName(null);
        }
    };

    useEffect(() => {
        fetchUserType();
    }, []);

    const login = async (name, password) => {
        try {
            const req = await axios.post(`${API_URL}/login`, { userName: name, password }, { withCredentials: true });

            if (req.data.isLogin) {
                setIsLogin(true);
                setUserType(req.data.userType);
                setUserName(userName);
            }

            return req.data; // Return the response so Login component can handle navigation
        } catch (error) {
            console.error("Login failed:", error);
            return { isLogin: false, message: "Login failed, please try again." };
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
            setIsLogin(false);
            setUserType(null);
            setUserName(userName);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLogin, userType,userName, login, logout,fetchUserType }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
