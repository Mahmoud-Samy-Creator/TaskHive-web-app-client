import React from "react";
import './UserSummury.scss';
import ProjectsDemands from "./WordspacesDemands/ProjectsDemands";
import UserSummuryHeader from "./UserSummuryHeader/UserSummuryHeader";

export default function UserSummury() {
    return(
        <div className='user-summury'>
                <UserSummuryHeader />
                <section className='user-summury-content'>
                    <ProjectsDemands />
                </section>
        </div>
    )
}