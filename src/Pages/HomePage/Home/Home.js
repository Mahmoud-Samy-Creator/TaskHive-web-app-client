import React, { useEffect, useState } from "react";
import { UserContext } from "./UserInfoContext";
import SideBar from '../SideBar/SideBar';
import Workspaces from "../Workspaces/Workspaces";
import AccountSetting from '../AccountSetting/AccountSetting';
import { Route, Routes } from 'react-router-dom';
import './Home.scss';
import axios from "axios";

// Get auth token from local storage
const storedTokenLoacal = localStorage.getItem('authToken');
const storedTokenSession = sessionStorage.getItem('authToken');

// API PARAMS
const apiURL = `http://localhost:5000/auth/me`;
let AuthHeaderParam = storedTokenLoacal ? storedTokenLoacal : storedTokenSession;
const AuthHeader =  {"Authorization":`Bearer ${AuthHeaderParam}`}

const apiConfig = {
    headers: AuthHeader
};

export default function Home() {

    // UserInfo from API state
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        // Getting signed user Info
        axios.get(apiURL, apiConfig)
        .then((res) => setUserInfo(res.data))
        .catch((err) => console.error(err));
    }, [])
    return(
        <UserContext.Provider value={userInfo}>
            <div className="home-page">
                <SideBar />
                <Routes>
                    <Route path="/*" element={<Workspaces />} />
                    <Route path="/workspaces/*" element={<Workspaces />} />
                    <Route path="/account-setting" element={<AccountSetting />} />
                </Routes>
            </div>
        </UserContext.Provider>
        
    );
}
