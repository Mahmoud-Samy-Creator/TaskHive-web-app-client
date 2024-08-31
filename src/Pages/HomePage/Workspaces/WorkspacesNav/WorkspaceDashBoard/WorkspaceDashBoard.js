import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import ProjectAddPopUp from "./ProjectAddPopUp/ProjectAddPopUp";
import TotalAvatars from "./TotalAvatars";
import axios from "axios";
import './WorkspaceDashBoard.scss';

const apiURL = "http://localhost:5000/workspaces";
const apiConfig = {
    headers: {
        "Authorization":`Bearer ${localStorage.getItem('authToken')}`
    }
};

export default function WorkspaceDashBoard({ workspaceName, workspaceNameStateHandler }) {
    // Workspace meta data
    const {workspaceId} = useParams();
    const [workspaceMetaData, setworkspaceMetaData] = useState({});
    const [workspaceNameInput, setWorkspaceNameInput] = useState("");
    const [WorkspaceMembers, setWorkspaceMembers] = useState([]);

    // Workspace members
    const [memberEmail, setMemberEmail] = useState("")

    // Workspace Projects navigation
    const [ProjectAddPopUpStyle, setDisplay] = useState({display: "none"});
    const [projectsExists, setProjectsExists] = useState([]);

    // Fetching Workspace metaData
    useEffect(() => {
        axios.get(`${apiURL}/${workspaceId}`, apiConfig)
        .then((res) => {
            setworkspaceMetaData(res.data);
            setWorkspaceNameInput(res.data.name);
        })
    }, [workspaceId]);

    // Fetching workspace members
    useEffect(() => {
        axios.get(`${apiURL}/${workspaceId}/members`, apiConfig)
        .then((res) => {
            setWorkspaceMembers(res.data);
        })
    }, [workspaceId])

    // Getting workspace existing Projects
    useEffect(() => {
        axios.get(`${apiURL}/${workspaceId}/projects`, apiConfig)
        .then((res) => {
            if (res.status === 200) {
                setProjectsExists(res.data)
            }
        })
        .catch((err) => console.error(err));
    }, [workspaceId])

    // Change workspace name
    function handleWorkspaceNameChange(e) {
        e.preventDefault();
        axios.put(
            `${apiURL}/${workspaceId}`,
            { name: workspaceNameInput, description: "" }, apiConfig)
        .then((res) => {
            setworkspaceMetaData((prevData) => ({
                ...prevData,
                name: workspaceNameInput,
            }));
            document.location.reload();
        })
        .catch((err) => {
            console.error("Error updating workspace name", err);
        });
    }
    // Adding new workspace members
    function handleAddWorkspaceMembers(e) {
        e.preventDefault();
        axios.put(
            `${apiURL}/${workspaceId}/add_member`,
            { "email": memberEmail }, apiConfig
        )
        .then((res) => {
            if (res.status === 200) {
                setMemberEmail("");
                setWorkspaceMembers((prevMembers) => [
                    ...prevMembers,
                    res.data.addedUser
                ]);
            }
        })
        .catch((err) => {
            console.error("Error adding members", err);
        });
    }

    // Handle delete a project
    function handleDeleteClick(e, id) {
        e.preventDefault();
        handleDeleteProject(id);
    }

    function handleProjectAdd(newProjects) {
        setProjectsExists(newProjects);
    }

    // Delete a project
    function handleDeleteProject(id) {
        axios.delete(`${apiURL}/${workspaceId}/projects/${id}`, apiConfig)
        .then((res) => {
            if (res.status === 200) {
                const newProjects = projectsExists.filter((project) => project.id !== id);
                setProjectsExists(newProjects);
            }
        })
        .catch((err) => {
            console.error("Error deleting project", err);
        });
    }

    return(
        <div className="workspace-dashBoard">
            <header className="workspace-header">
                <ChangeWorkspaceNameForm 
                    workspaceName={workspaceMetaData.name}
                    changeHandler={handleWorkspaceNameChange}
                    changeInputHandler={setWorkspaceNameInput}
                />
                <div style={{display: "flex"}} className="workspace-members">
                    <TotalAvatars WorkspaceMembers = {WorkspaceMembers} setWorkspaceMembers={setWorkspaceMembers}/>
                    <form onSubmit={(e) => {handleAddWorkspaceMembers(e)}}>
                        <input
                            type='email'
                            placeholder="Enter member email"
                            value={memberEmail}
                            onChange={(e) => setMemberEmail(e.target.value)}
                        />
                        <button className="workspace-add-members"><FontAwesomeIcon icon={faPlus} /> Add member</button>
                    </form>
                </div>
            </header>
            <h3>Projects</h3>
            <div className="workspace-projects">
                <ProjectAddPopUp 
                    style = {ProjectAddPopUpStyle}
                    styleHandler = {setDisplay}
                    projectsAdded = {projectsExists}
                    projectAddMethod = {handleProjectAdd}
                    workspaceId = {workspaceId}
                />
                <div className="workspace-project-add-button" onClick={() => setDisplay({display: "block"})}>
                    Add <br></br>Project
                </div>
                {projectsExists.map((project, index) => {
                    return(
                        <ProjectsExists
                            workspaceId={workspaceId}
                            project={project}
                            handler={handleDeleteClick}
                            key={project.id}
                        />
                    );
                })}
            </div>
        </div>
    );
}

// Navigate to a project
function ProjectsExists({ workspaceId, project, handler }) {
    return(
        <Link to={`/home/workspaces/${workspaceId}/projects/${project.id}`}>
            <div className="workspace-existing-projects">
                {project.name}
                <span
                    className="project-delete-icon"
                    onClick={(e) => handler(e, project.id)}
                >
                    <FontAwesomeIcon icon={faTrashCan} />
                </span>
            </div>
        </Link>
    );
}

// ChangingWorkspaceName
function ChangeWorkspaceNameForm({workspaceName, changeHandler, changeInputHandler}) {
    return(
        <form className="workspace-name" onSubmit={(e) => {changeHandler(e)}}>
            <input
                type='text'
                placeholder={workspaceName}
                onChange={(e) => {changeInputHandler(e.target.value)}}/>
            <button type='submit'>Change</button>
        </form>
    )
}
