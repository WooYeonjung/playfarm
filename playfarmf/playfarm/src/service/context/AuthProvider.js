// src/context/AuthProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiCall } from '../apiService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginInfo, setLoginInfo] = useState(null);

    useEffect(() => {
        const loginCheck = JSON.parse(sessionStorage.getItem("loginInfo"));
        // if (loginCheck && loginCheck.token) {
        //     setIsLoggedIn(true);
        //     setLoginInfo(loginCheck);
        // }

        if (loginCheck) {
            setIsLoggedIn(true);
            setLoginInfo(loginCheck);
        }
    }, []);

    // const onLoginSubmit = async (userId, userPassword) => {
    //     const url = "/user/login";
    //     const data = { id: userId, password: userPassword };
    //     try {
    //         const response = await apiCall(url, 'POST', data, null);
    //         sessionStorage.setItem("loginInfo", JSON.stringify(response));
    //         setIsLoggedIn(true);
    //         setLoginInfo(response);
    //     } catch (err) {
    //         setIsLoggedIn(false);
    //         setLoginInfo(null);
    //         console.error("Login error:", err);
    //     }
    // };

    const onLoginSubmit = (userId, userPassword) => {
        const url = "/user/login";
  
        const data = { id: userId, password: userPassword };
       
        apiCall(url, 'POST', data)
            .then((response) => {
                sessionStorage.setItem("loginInfo", JSON.stringify(response));
                setIsLoggedIn(true);
                setLoginInfo(response);
            }).catch((err) => {
                setIsLoggedIn(false);
                setLoginInfo('');
                throw err; // 오류를 상위 호출로 전달
            });

    };

    const onLogout = async () => {
        const url = "/user/logout";
        try {
            await apiCall(url, 'GET', null, loginInfo.token);
            sessionStorage.clear();
            setIsLoggedIn(false);
            setLoginInfo(null);
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, loginInfo, onLoginSubmit, onLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
