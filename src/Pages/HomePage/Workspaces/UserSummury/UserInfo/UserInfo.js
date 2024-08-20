import React from "react";
import { useContext } from "react";
import { userInfoJson } from "../Contexts/UserInfoContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import './UserInfo.scss';

function SocialMediaConnection({platform, info, icon, color, link}) {
    return(
        <>
            <div className="user-connect-platform">
                    <div style={{color: "gray"}}>{platform}</div>
                    <div>{info}</div>
            </div>
            <div className="social-contact">
                <a target ='_blank' rel="noreferrer" href={link}><FontAwesomeIcon icon={icon} style={{color: color}}/></a>
                
            </div>
        </>
    );
}
export default function UserInfo() {
    const userInfoParam = useContext(userInfoJson);
    return(
        <section className='user-info'>
            <div className='user-info-summury'>
                {userInfoParam.img}
                <div>{userInfoParam.name}</div>
                <div>{userInfoParam.title}</div>
            </div>
            <div className='user-connect'>
                <SocialMediaConnection
                    platform="LinkedIn"
                    info={userInfoParam.linkedinUser}
                    icon={faLinkedin}
                    color="#1565c0"
                    link='/'/>
            </div>
            <div className='user-connect'>
                <SocialMediaConnection
                    platform="Email"
                    info={userInfoParam.email}
                    icon={faEnvelope}
                    color="#617c8b"
                    link="mailto:mahmoud.samy.elshora@gmail.com"/>
            </div>
            <div className='user-connect'>
                <SocialMediaConnection
                    platform="WhatsApp"
                    info={userInfoParam.phone}
                    icon={faWhatsapp}
                    color="green"
                    link='https://wa.link/sl41rs'/>
            </div>
            <div className='user-connect'>
                <SocialMediaConnection
                    platform="Facebook"
                    info={userInfoParam.facebookUser}
                    icon={faFacebook}
                    color="#1976d2"
                    link={`https://www.facebook.com${userInfoParam.facebookUser}`}/>
            </div>
        </section>
    );
}