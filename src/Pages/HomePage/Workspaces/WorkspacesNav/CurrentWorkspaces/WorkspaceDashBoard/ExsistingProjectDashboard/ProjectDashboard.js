import React, { useEffect, useState } from "react";
import './ProjectDashboard.scss';
import UpdateProjectInfo from "./UpdateProjectInfo/UpdateProjectInfo";
import DashboardHeader from "./DashboardHeader/DashboardHeader";
import ProjectProperties from './ProjectProperties/ProjectProperties';
import KanbanBoard from "./ProjectProperties/ProjectPropertiesTaps/KanbanBoard/KanbanBoard";
import ProjectNotes from "./ProjectProperties/ProjectPropertiesTaps/ProjectNotes/ProjectNotes";
import ProjectQuestions from "./ProjectProperties/ProjectPropertiesTaps/ProjectQuestions/ProjectQuestions";
import { useParams, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function ProjectDashboard() {
    const { workspaceId, projectId } = useParams();
    const [projectTasks, setProjectTasks] = useState({})
    const [projectInfo, setProjectInfo] = useState({
        "id": "",
        "name": "",
        "description": "",
        "deadline": "",
    })
    const [ProjectInfoUpdatePopUp, setProjectInfoUpdatePopUp] = useState({display: "none"});
    useEffect(() => {
        // Get project information
        axios.get(`http://localhost:5000/workspaces/${workspaceId}/projects/${projectId}`,
            {
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem('authToken')}`
                }
            }
        )
        .then((res) => {
            setProjectInfo(res.data);
        })
        .catch((err) => {
            console.error(err);
        })

        // Get project tasks
        // Get Projects tasks
        axios.get(`http://localhost:5000/workspaces/${workspaceId}/projects/${projectId}/tasks`,
            {
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem('authToken')}`
                }
            }
        )
        .then((res) => {
            if (res.status === 200) {
                setProjectTasks(res.data);
                const allTasks = res.data;
                console.log(allTasks)
            }
        })
        .catch((err) => {
            console.error(err);
        })
    }, [workspaceId, projectId]);

    return (
        <div className="dashboard">
            <DashboardHeader name={projectInfo.name} visibleHandler={setProjectInfoUpdatePopUp}/>
            <ProjectProperties name={projectInfo.name} workspaceId={workspaceId} projectId={projectId} />
            <UpdateProjectInfo
                projectInfo={projectInfo}
                visible={ProjectInfoUpdatePopUp}
                handleVisiblity={setProjectInfoUpdatePopUp}
            />
            <Routes>
                <Route path="/" element={<Navigate to="KanbanBoard" />} />
                <Route
                    path="KanbanBoard"
                    element={
                        <KanbanBoard
                            workspaceId={workspaceId}
                            projectId={projectId}
                            projectTasks={projectTasks}
                            setProjectTasks={setProjectTasks}
                        />
                    }
                />
                <Route path="notes" element={<ProjectNotes />} />
                <Route path="questions" element={<ProjectQuestions />} />
            </Routes>

        </div>
    );
}
