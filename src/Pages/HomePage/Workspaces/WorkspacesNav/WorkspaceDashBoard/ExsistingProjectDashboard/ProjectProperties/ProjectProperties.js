import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSheetPlastic } from "@fortawesome/free-solid-svg-icons";
import ProjectMembers from './Components/ProjectMembers/ProjectMembers'

const progressBar = 80;

export default function ProjectProperties({ name, workspaceId, projectId }) {
    return(
        <div className="project-properties">
            <div>
                <div>
                    <div className="project-icon">
                        <FontAwesomeIcon icon={faSheetPlastic} />
                    </div>
                    <div className="project-progress">
                        <div>{name}</div>
                        <div>
                            <span style={{width: `${progressBar}%`, height: "100%"}}></span>
                        </div>
                    </div>
                </div>
                <ProjectMembers workspaceId={workspaceId} projectId={projectId}/>
            </div>
            <div>
                <ul>
                    <li className="project-props-nav">
                        <Link to='KanbanBoard'>Tasks</Link>
                    </li>
                    <li className="project-props-nav">
                        <Link to='notes'>Notes</Link>
                    </li>
                    <li className="project-props-nav">
                        <Link to='questions'>Quesitons</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

