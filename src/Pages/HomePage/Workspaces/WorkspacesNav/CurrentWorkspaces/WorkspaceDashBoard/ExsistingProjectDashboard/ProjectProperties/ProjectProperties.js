import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSheetPlastic, faPlus } from "@fortawesome/free-solid-svg-icons";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

const progressBar = 80;

export default function ProjectProperties({ name }) {
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
                <div>
                    <div className="members"><TotalAvatars /></div>
                    <div className="add-members">
                        <button><FontAwesomeIcon icon={faPlus} /> Add members</button>
                    </div>
                </div>
            </div>
            <div>
                <ul>
                    <li className="project-props-nav">
                        <Link to='overview'>Overview</Link>
                    </li>
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


function TotalAvatars() {
    return (
    <AvatarGroup total={24}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
    </AvatarGroup>
    );
}