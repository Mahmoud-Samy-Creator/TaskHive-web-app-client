import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import './WorkspaceDashBoard.scss';
import { useParams } from "react-router-dom";
import ProjectAddPopUp from "./ProjectAddPopUp/ProjectAddPopUp";

export default function WorkspaceDashBoard() {
    const [ProjectAddPopUpStyle, setDisplay] = useState({display: "none"});
    const [projectsExists, setProjectsExists] = useState([
        {
            name: "Project 1",
            disc: "This is project 1",
            startData: "",
            endData: "",
            id: 1
        }
    ]);
    const {workspaceId} = useParams();
    function handleDeleteProject(id) {
        const newProjects = projectsExists.filter((project) => (project.id !==id))
        setProjectsExists(newProjects);
    }
    return(
        <div className="workspace-dashBoard">
            <h1>Projects</h1>
            <div className="workspace-projects">
                <ProjectAddPopUp 
                    style = {ProjectAddPopUpStyle}
                    styleHandler = {setDisplay}
                    projectsAdded = {projectsExists}
                    projectAddMethod = {setProjectsExists}
                />
                <div className="workspace-project-add-button" onClick={() => setDisplay({display: "block"})}>
                    Add <br></br>Project
                </div>
                {projectsExists.map((project) => {
                    return(
                        <Link to={`/home/workspaces/${workspaceId}/${project.name}`}>
                            <div className="workspace-existing-projects" key={project.id}>
                                {project.name}
                                <span className="project-delete-icon" onClick={(e) => {
                                    e.preventDefault();
                                    handleDeleteProject(project.id)
                                }}><FontAwesomeIcon icon={faTrashCan} /></span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
