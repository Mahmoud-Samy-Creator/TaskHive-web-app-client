import React from "react";
import './UserSummuryHeader.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { userInfoJson } from "../Contexts/UserInfoContext";
import { useContext } from "react";



export default function UserSummuryHeader() {
    const userInfoParam = useContext(userInfoJson);
    return(
        <header>
            <div className='user-name-header'>
                {userInfoParam.name}
            </div>
            <div className='header-icons'>
                <a href='/'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </a>
                <a href='/'>
                    <FontAwesomeIcon icon={faBell} />
                </a>
            </div>
        </header>
    );
}