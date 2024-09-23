import React from "react";
import { useParams, Routes, Route, Navigate } from "react-router-dom";
import ApiReqContext from "../../../Contexts/ApiContext";
import UpdateProjectInfo from "./UpdateProjectInfo/UpdateProjectInfo";
import DashboardHeader from "./DashboardHeader/DashboardHeader";
import ProjectProperties from './ProjectProperties/ProjectProperties';
import KanbanBoard from "./ProjectProperties/ProjectPropertiesTaps/KanbanBoard/KanbanBoard";
import ProjectNotes from "./ProjectProperties/ProjectPropertiesTaps/ProjectNotes/ProjectNotes";
import ProjectQuestions from "./ProjectProperties/ProjectPropertiesTaps/ProjectQuestions/ProjectQuestions";
import axios from "axios";
import './ProjectDashboard.scss';

export default function ProjectDashboard() {
    const { workspaceId, projectId } = useParams();
    const [projectInfo, setProjectInfo] = React.useState({
        id: "",
        name: "",
        description: "",
        deadline: "",
    })
    const [ProjectInfoUpdatePopUp, setProjectInfoUpdatePopUp] = React.useState({display: "none"});
    const {apiURL, apiConfig} = React.useContext(ApiReqContext);

    React.useEffect(() => {
        // Get project information
        axios.get(`${apiURL}/${workspaceId}/projects/${projectId}`, apiConfig)
        .then((res) => {
            setProjectInfo(res.data);
        })
        .catch((err) => {
            console.error(err);
        })
        // Get project tasks
    }, [workspaceId, projectId, apiURL, apiConfig]);

    return (
        <div className="dashboard">
            <DashboardHeader name={projectInfo.name} visibleHandler={setProjectInfoUpdatePopUp}/>
            <ProjectProperties name={projectInfo.name} workspaceId={workspaceId} projectId={projectId} />
            <UpdateProjectInfo
                projectInfo={projectInfo}
                setProjectInfo={setProjectInfo}
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
                        />
                    }
                />
                <Route path="notes" element={<ProjectNotes />} />
                <Route path="questions" element={<ProjectQuestions />} />
            </Routes>
        </div>
    );
}
