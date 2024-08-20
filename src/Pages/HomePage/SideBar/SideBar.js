import React from "react";
import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarDays, faComments } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket, faHouse, faBars } from "@fortawesome/free-solid-svg-icons";
import './SideBar.scss';

export default function SideBar() {
    // Trace the window width for responsivness
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    // const [isOpen, setIsOpen] = useState(false);
    // function handleWindowWidthChange() {
    //     setWindowWidth(window.innerWidth);
    //     window.innerWidth < 950 ? console.log(window.innerWidth) : console.log('');
    // }
    // useEffect(() => {
    //     window.addEventListener('resize', handleWindowWidthChange);
    //     return () => {
    //         window.removeEventListener('resize', handleWindowWidthChange);
    //     };
    // }, [windowWidth]);
    // Trace the window width for responsivness

    return (
        <div className="side-bar opened">
            <div className="side-bar-icons">
                <div className="sidebar-on-mobile">
                    <div className="logo">Logo</div>
                    <FontAwesomeIcon className="wide-sideNav" icon={faBars} />
                </div>
                <Link to="/home/workspaces">
                    <div className="icon">
                        <FontAwesomeIcon icon={faHouse} />
                        <div className="icon-disc">Home</div>
                    </div>
                </Link>
                <Link to="/home/account-setting">
                    <div className="icon">
                        <FontAwesomeIcon icon={faUser} />
                        <div className="icon-disc">Setting</div>
                    </div>
                </Link>
                <Link to="/home/calender">
                    <div className="icon">
                        <FontAwesomeIcon icon={faCalendarDays} />
                        <div className="icon-disc">Calender</div>
                    </div>
                </Link>
                <Link to="/home">
                    <div className="icon">
                        <FontAwesomeIcon icon={faComments} />
                        <div className="icon-disc">Message</div>
                    </div>
                </Link>
                <Link to="/auth/login">
                    <div className="icon logout">
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        <div className="icon-disc">Logout</div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
