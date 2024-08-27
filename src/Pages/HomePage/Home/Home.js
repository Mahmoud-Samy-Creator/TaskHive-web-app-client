import React from "react";
import SideBar from '../SideBar/SideBar';
import Workspaces from "../Workspaces/Workspaces";
import AccountSetting from '../AccountSetting/AccountSetting';
import { Route, Routes } from 'react-router-dom';
import './Home.scss';

export default function Home() {
    return(
        <div className="home-page">
            <SideBar />
            <Routes>
                <Route path="/" element={<Workspaces />} />
                <Route path="/workspaces/*" element={<Workspaces />} />
                <Route path="/account-setting" element={<AccountSetting />} />
            </Routes>
            </div>
    );
}
