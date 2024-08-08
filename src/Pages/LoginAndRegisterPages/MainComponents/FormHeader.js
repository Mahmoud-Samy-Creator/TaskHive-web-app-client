import React from "react";
import SocialMediaIcons from "./SocialMediaIcons";

export default function FormHeader({headerContent, rule}) {
    return(
            <div className="d-flex">
                <div className="w-100">
                    <h3 className="mb-4">{headerContent}</h3>
                </div>
                {(rule) ? <SocialMediaIcons /> : <></>}
            </div>
    );
}