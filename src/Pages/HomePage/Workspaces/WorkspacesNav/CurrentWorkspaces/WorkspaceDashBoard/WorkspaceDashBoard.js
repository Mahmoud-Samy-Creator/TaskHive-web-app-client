import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import ProjectAddPopUp from "./ProjectAddPopUp/ProjectAddPopUp";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import axios from "axios";
import './WorkspaceDashBoard.scss';

export default function WorkspaceDashBoard() {
    // Workspace meta data
    const {workspaceId} = useParams();
    const [workspaceMetaData, setworkspaceMetaData] = useState({});
    const [workspaceNameInput, setWorkspaceNameInput] = useState("");
    const [WorkspaceMembers, setWorkspaceMembers] = useState([]);

    // Workspace members
    const [memberName, setMemberName] = useState("")

    // Workspace Projects navigation
    const [ProjectAddPopUpStyle, setDisplay] = useState({display: "none"});
    const [projectsExists, setProjectsExists] = useState([]);

    // Fetching Workspace metaData
    useEffect(() => {
        axios.get(`http://localhost:5000/workspaces/${workspaceId}`, {
            headers: {
                "Authorization":`Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then((res) => {
            setworkspaceMetaData(res.data);
            setWorkspaceNameInput(res.data.name);
        })
    }, [workspaceId]);
    
    // Fetching workspace members
    useEffect(() => {
        axios.get(`http://localhost:5000/workspaces/${workspaceId}/members`, {
            headers: {
                "Authorization":`Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then((res) => {
            setWorkspaceMembers(res.data);
        })
    }, [workspaceId])

    // Getting workspace existing Projects
    useEffect(() => {
        axios.get(`http://localhost:5000/workspaces/${workspaceId}/projects`, {
            headers: {
                "Authorization":`Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then((res) => {
            console.log(res);
            setProjectsExists(res.data)
        })
    }, [workspaceId])

    // Change workspace name
    function handleWorkspaceNameChange(e) {
        e.preventDefault();
        axios.put(
            `http://localhost:5000/workspaces/${workspaceId}`,
            { name: workspaceNameInput, description: "" },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            }
        )
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

    // Adding new workspace members to server
    function handleAddWorkspaceMembers(e) {
        e.preventDefault();
        axios.post(
            `http://localhost:5000/workspaces/${workspaceId}/members`,
            { "members": [memberName] },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('authToken')}`
                }
            }
        )
        .then((res) => {
            setMemberName("");
        })
        .catch((err) => {
            console.error("Error adding members", err);
        });
    }

    function handleDeleteClick(e, id) {
        e.preventDefault();
        console.log(id);
        handleDeleteProject(id);
    }

    // Delete a project
    function handleDeleteProject(id) {
        axios.delete(`http://localhost:5000/workspaces/${workspaceId}/projects/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then((res) => {
            const newProjects = projectsExists.filter((project) => project._id !== id);
            setProjectsExists(newProjects);
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
                    {TotalAvatars(WorkspaceMembers)}
                    <form onSubmit={(e) => {handleAddWorkspaceMembers(e)}}>
                        <input
                            type='text'
                            placeholder="Enter member email"
                            value={memberName}
                            onChange={(e) => setMemberName(e.target.value)}
                        />
                        <button className="workspace-add-members"><FontAwesomeIcon icon={faPlus} /> Add members</button>
                    </form>
                </div>
            </header>
            <h3>Projects</h3>
            <div className="workspace-projects">
                <ProjectAddPopUp 
                    style = {ProjectAddPopUpStyle}
                    styleHandler = {setDisplay}
                    projectsAdded = {projectsExists}
                    projectAddMethod = {setProjectsExists}
                    workspaceId = {workspaceId}
                />
                <div className="workspace-project-add-button" onClick={() => setDisplay({display: "block"})}>
                    Add <br></br>Project
                </div>
                {projectsExists.map((project, index) => {
                    return(
                        <Link to={`/home/workspaces/${workspaceId}/${project.name}`}>
                            <div className="workspace-existing-projects" key={index}>
                                {project.name}
                                <span
                                    className="project-delete-icon"
                                    onClick={(e) => handleDeleteClick(e, project._id)}
                                >
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

// Visualizing workspace members
function TotalAvatars(workspaceMembers) {
    return (
        
        <AvatarGroup total={workspaceMembers.length} style={{width: "fit-content"}}>
            {workspaceMembers.map((member, index) => {
                return(<Avatar alt={member.email} src={`/static/images/avatar/${index}.jpg`} key={member.id}/>);
            })}
        </AvatarGroup>
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
