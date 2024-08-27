import React from "react";
import './Workspaces.scss';
import WorkspacesNav from "./WorkspacesNav/WorkspacesNav";
import UserSummury from "./UserSummury/UserSummury";
import WorkspaceDashBoard from "./WorkspacesNav/CurrentWorkspaces/WorkspaceDashBoard/WorkspaceDashBoard";
import ProjectDashboard from './WorkspacesNav/CurrentWorkspaces/WorkspaceDashBoard/ExsistingProjectDashboard/ProjectDashboard'
import { Route, Routes } from "react-router-dom";
export default function Workspaces() {
    return(
        <div className="workspace">
            <WorkspacesNav />
            <Routes path='/'>
                <Route path='/' element={<UserSummury />} index/>
                <Route path=':workspaceId/projects' element={<WorkspaceDashBoard />}/>
                <Route path=':workspaceId/projects/:projectId/*' element={<ProjectDashboard />}/>
            </Routes>
        </div>
    )
}