import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import googleIcon from '../assets/googleIcon.webp'
export default function SocialMediaIcons() {
    const style = {width: "25px", height: "25px"}
    return(
        
        <div className="w-100">
            <p className="social-media d-flex justify-content-end">
                <a href="/" className="social-icon d-flex align-items-center justify-content-center">
                    <img src={googleIcon} alt="googleIcon" style={style}/>
                    {/* <FontAwesomeIcon icon={faGoogle} /> */}
                </a>
            </p>
        </div>
    );
}