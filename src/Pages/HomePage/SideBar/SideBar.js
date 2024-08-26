import React from "react";
import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarDays, faComments } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket, faHouse } from "@fortawesome/free-solid-svg-icons";
import './SideBar.scss';

export default function SideBar() {
    return (
        <div className="side-bar opened">
            <div className="side-bar-icons">
                <SideBarLinkNav params={{
                    navLink: "/home/workspaces",
                    icon: faHouse,
                    name: "Home"
                }}/>
                <SideBarLinkNav params={{
                    navLink: "/home/account-setting",
                    icon: faUser,
                    name: "Setting"
                }}/>
                <SideBarLinkNav params={{
                    navLink: "/home/calender",
                    icon: faCalendarDays,
                    name: "Calender"
                }}/>
                <SideBarLinkNav params={{
                    navLink: "/home",
                    icon: faComments,
                    name: "Message"
                }}/>
                <LogOutComponent params={{
                    name: "Logout",
                    icon: faRightFromBracket
                }} />
            </div>
        </div>
    );
}

function SideBarLinkNav({ params }) {
    return(
        <Link to={params.navLink}>
            <div className="icon">
                <FontAwesomeIcon icon={params.icon} />
                <div className="icon-disc">{params.name}</div>
            </div>
        </Link>
    );
}

function LogOutComponent({ params }) {
    return(
        <div className="icon logout" onClick={() => logOutFunctionality()} >
            <FontAwesomeIcon icon={params.icon}/>
            <div className="icon-disc">{params.name}</div>
        </div>
    );
}

function logOutFunctionality() {
    localStorage.clear();
    setTimeout(() => {
        document.location.reload();
    }, 1000);
}
