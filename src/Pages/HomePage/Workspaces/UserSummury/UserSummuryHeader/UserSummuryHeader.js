import React from "react";
import './UserSummuryHeader.scss'
import { UserContext } from "../../../Home/UserInfoContext";
import { useContext } from "react";



export default function UserSummuryHeader() {
    const userInfo = useContext(UserContext);
    return(
        <header>
            <div className='user-name-header'>
                {userInfo?.username}
            </div>
        </header>
    );
}