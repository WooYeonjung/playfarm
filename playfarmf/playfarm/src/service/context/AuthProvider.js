// src/context/AuthProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiCall } from '../apiService';

const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const loginNavi = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginInfo, setLoginInfo] = useState(null);

    // 계정 활성화 하기
    const [reassign, setReassign] = useState(false);
    const [reassignData, setReassignData] = useState({ userId: '', email: '' });

    useEffect(() => {
        const loginCheck = JSON.parse(sessionStorage.getItem("loginInfo"));
        if (loginCheck && loginCheck.token && isTokenValid(loginCheck.token)) {
            setIsLoggedIn(true);
            setLoginInfo(loginCheck);
        }

    }, []);


    const onLoginSubmit = async (userId, userPassword) => {
        const url = "/user/login";

        const data = { userId: userId, password: userPassword };

        try {
            const response = await apiCall(url, 'POST', data);
            sessionStorage.setItem("loginInfo", JSON.stringify(response));
            setIsLoggedIn(true);
            setLoginInfo(response);
            alert("로그인 성공!");
            loginNavi('/');
        } catch (err) {
            setIsLoggedIn(false);
            setLoginInfo('');
            if (err.response.status === 502) {
                alert("id 또는 password 가 다릅니다. 다시 시도해 주세요.");
            } else if (err.response.status === 500) {
                /* eslint-disable no-restricted-globals */
                if (confirm('이미 탈퇴한 회원입니다. 재가입 하시겠습니까?')) {
                    setReassign(true);
                }
            } else {
                alert("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
            }
        }

    };

    //   계정 활성화 하기
    const handleReassignSubmit = async (e) => {
        //e.preventDefailt();

        setReassignData({ userId: reassignData.userId, email: reassignData.email });
        console.log(reassignData);
        try {

            const response = await apiCall('/user/reassign', 'POST', reassignData, null);
            console.log(response);

            alert(response);
            setReassign(false);
            setLoginInfo(null);
            sessionStorage.clear();
            navigator("/login");

        } catch (err) {
            alert(err.response.data);
            setLoginInfo(null);
            navigator("/login");
            setReassign(true);
        }

    };


    const reassignContext = {
        reassign,
        setReassign,
        reassignData,
        setReassignData,
        handleReassignSubmit
    };

    const onLogout = async () => {
        const url = "/user/logout";
        try {
            const response = await apiCall(url, 'GET', null, loginInfo.token);
            sessionStorage.clear();
            setIsLoggedIn(false);
            setLoginInfo(null);
            alert(response);
            loginNavi('/');
        } catch (err) {
            console.error("Logout error:", err);
        }
    };


    return (
        <AuthContext.Provider value={{ isLoggedIn, loginInfo, onLoginSubmit, onLogout, setLoginInfo, reassignContext }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;


const isTokenValid = (token) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiry = payload.exp;
        const now = Math.floor(Date.now() / 1000);
        return now < expiry;
    } catch (e) {
        return false;
    }
};