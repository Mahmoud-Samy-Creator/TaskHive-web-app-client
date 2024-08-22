import React from "react";
import './ProjectDashboard.scss';
import DashboardHeader from "./DashboardHeader/DashboardHeader";
import ProjectProperties from './ProjectProperties/ProjectProperties';
import KanbanBoard from "./KanbanBoard/KanbanBoard";
import ProjectOverView from "./ProjectOverView/ProjectOverView";
import ProjectNotes from "./ProjectNotes/ProjectNotes";
import ProjectQuestions from "./ProjectQuestions/ProjectQuestions";
import { useParams, Routes, Route } from "react-router-dom";

export default function ProjectDashboard() {
    const { workspaceId, projectName } = useParams();
    console.log(workspaceId);
    console.log(projectName);

    return (
        <div className="dashboard">
            <DashboardHeader name={projectName}/>
            <ProjectProperties name={projectName}/>
            <Routes>
                <Route path={``} element={<ProjectOverView />}/>
                <Route path={`overview`} element={<ProjectOverView />}/>
                <Route path={`KanbanBoard`} element={<KanbanBoard />}/>
                <Route path={`notes`} element={<ProjectNotes />}/>
                <Route path={`questions`} element={<ProjectQuestions />}/>
            </Routes>
        </div>
    );
}
