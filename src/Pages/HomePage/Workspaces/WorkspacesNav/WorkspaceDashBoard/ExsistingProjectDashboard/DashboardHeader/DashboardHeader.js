import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";


export default function DashboardHeader({ name, visibleHandler }) {
    function handleAppearProjectUpdataPopup() {
        visibleHandler({display: "flex"})
    }
    return(
        <div className="dash-board-header">
            <div>{name}</div>
            <div>
                <div
                    className="project-header-setting"
                    onClick={(e) => {handleAppearProjectUpdataPopup()}}
                >
                    <FontAwesomeIcon icon={faGear} />
                </div>
            </div>
        </div>
    );
}