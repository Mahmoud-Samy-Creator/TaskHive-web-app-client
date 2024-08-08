import React from "react";

export default function SignupLoginRef({headerContent, statment, hyperLink, linkContent}) {
    return(
        <div className="text w-100">
            <h2>{headerContent}</h2>
            <p>{statment}</p>
            <a href={hyperLink} className="btn btn-white btn-outline-white">{linkContent}</a>
        </div>
    );
}