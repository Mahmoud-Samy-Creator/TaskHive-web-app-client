import React from "react";
import WorkspacesNav from "./WorkspacesNav/WorkspacesNav";
import UserSummury from "./UserSummury/UserSummury";
import WorkspaceDashBoard from './WorkspacesNav/WorkspaceDashBoard/WorkspaceDashBoard';
import ProjectDashboard from './WorkspacesNav/WorkspaceDashBoard/ExsistingProjectDashboard/ProjectDashboard';
import { Route, Routes } from "react-router-dom";
export default function Workspaces() {
    return(
        <div className="workspace" style={{display: "flex", flexGrow: "1"}}>
            <WorkspacesNav />
            <Routes path='/'>
                <Route path='/' element={<UserSummury />} index/>
                <Route path=':workspaceId/projects' element={<WorkspaceDashBoard />}/>
                <Route path=':workspaceId/projects/:projectId/*' element={<ProjectDashboard />}/>
            </Routes>
        </div>
    )
}