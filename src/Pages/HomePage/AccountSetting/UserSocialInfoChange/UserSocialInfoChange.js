import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faToolbox } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
export default function UserSocialInfoChange() {
    return(
        <div className="change-profile-info">
                    <section>
                        <form action="/action_page.php">
                            <div className='user-media-setting'>
                                <SocialMediaInfo
                                    platform="LinkedIn"
                                    info="text"
                                    icon={faLinkedin}
                                    color="#1565c0"/>
                            </div>
                            <div className='user-media-setting'>
                                <SocialMediaInfo
                                    platform="Email"
                                    info="text"
                                    icon={faEnvelope}
                                    color="#617c8b"/>
                            </div>
                            <div className='user-media-setting'>
                                <SocialMediaInfo
                                    platform="WhatsApp"
                                    info="text"
                                    icon={faWhatsapp}
                                    color="green"/>
                            </div>
                            <div className='user-media-setting'>
                                <SocialMediaInfo
                                    platform="Facebook"
                                    info="text"
                                    icon={faFacebook}
                                    color="#1976d2"/>
                            </div>
                            <div className='user-media-setting'>
                                <SocialMediaInfo
                                    platform="title"
                                    info="text"
                                    icon={faToolbox}
                                    color="#2c4755"/>
                            </div>
                            <input type='submit'></input>
                        </form>
                    </section>
                </div>
    );
}

function SocialMediaInfo({ info, icon, color }) {
    const [isEditable, setIsEditable] = useState(false);
    const handleEdit = () => {
        setIsEditable(true);
    };

    return (
        <div className='user-info-change-social'>
            <div className="social-icon">
                <FontAwesomeIcon icon={icon} style={{ color: color }} />
            </div>
            <div className="user-media-platform">
                <input 
                    type="text" 
                    placeholder={info} 
                    readOnly={!isEditable} 
                    onBlur={() => setIsEditable(false)}
                />
                <span onClick={handleEdit} style={{ cursor: 'pointer'}}>Change</span>
            </div>
        </div>
    );
}