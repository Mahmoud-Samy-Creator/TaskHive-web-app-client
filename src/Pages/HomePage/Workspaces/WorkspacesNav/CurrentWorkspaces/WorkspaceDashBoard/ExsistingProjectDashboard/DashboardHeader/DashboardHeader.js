import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
export default function DashboardHeader({ name }) {
    return(
        <div className="header">
            <div>{name}</div>
            <div>
                <div className="project-header-setting"><FontAwesomeIcon icon={faGear} /></div>
            </div>
        </div>
    );
}