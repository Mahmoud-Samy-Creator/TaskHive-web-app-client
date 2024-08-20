import React from "react";
import './UserSummury.scss';
// import UserInfo from "./UserInfo/UserInfo";
import ProjectsDemands from "./WordspacesDemands/ProjectsDemands";
import UserSummuryHeader from "./UserSummuryHeader/UserSummuryHeader";
// import UserSummuryFeeds from "./UserSummuryFeeds/UserSummuryFeeds";
import { userInfoJson } from "./Contexts/UserInfoContext";

const userInformation = {
        name: "Mahmoud Samy",
        img:<div className="user-account-photo">
                Photo
            </div>,
        title: "Front-end Engineer",
        email: "mahmoud@gmail.com",
        phone: "+20-102-551-6740",
        linkedinUser: "/mahmoud-samy-64421a273",
        facebookUser: '/Mahmoud.Samy.2024'
    }
export default function UserSummury() {
    return(
        <userInfoJson.Provider value={userInformation}>
            <div className='user-summury'>
                <UserSummuryHeader />
                <section className='user-summury-content'>
                    {/* <UserInfo /> */}
                    <ProjectsDemands />
                    {/* <UserSummuryFeeds /> */}
                </section>
            </div>
        </userInfoJson.Provider>
        
    )
}