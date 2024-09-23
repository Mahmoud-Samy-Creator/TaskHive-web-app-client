import React from "react";
import { Route, Routes } from "react-router-dom";

// Import needed Contexts
import ApiReqContext  from "./Contexts/ApiContext";

// Import main Components
import WorkspacesNav from "./WorkspacesNav/WorkspacesNav";
import UserSummury from "./UserSummury/UserSummury";
import WorkspaceDashBoard from './WorkspacesNav/WorkspaceDashBoard/WorkspaceDashBoard';
import ProjectDashboard from './WorkspacesNav/WorkspaceDashBoard/ExsistingProjectDashboard/ProjectDashboard';

// Get auth token from storage
const storedTokenLoacal = localStorage.getItem('authToken');
const storedTokenSession = sessionStorage.getItem('authToken');

// API PARAMS
const apiURL = 'http://localhost:5000/workspaces';
let AuthHeaderParam = storedTokenLoacal ? storedTokenLoacal : storedTokenSession;
const AuthHeader =  {"Authorization":`Bearer ${AuthHeaderParam}`};

const apiConfig = {
    headers: AuthHeader
};

const apiParams = { apiURL, apiConfig }

export default function Workspaces() {

    return(
        <ApiReqContext.Provider value={apiParams}>
            <div className="workspace" style={{display: "flex", flexGrow: "1"}}>
                <WorkspacesNav />
                <Routes path='/'>
                    <Route path='/' element={<UserSummury />} index/>
                    <Route path=':workspaceId/projects' element={<WorkspaceDashBoard />}/>
                    <Route path=':workspaceId/projects/:projectId/*' element={<ProjectDashboard />}/>
                </Routes>
            </div>
        </ApiReqContext.Provider>
    )
}
