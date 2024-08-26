import React from "react";
import './WorkspacesNav.scss';
import CurrentWorkspaces from "./CurrentWorkspaces/CurrentWorkspaces";
// import CurrentMembers from "./CurrentMembers/CurrentMembers";

export default function WorkspacesNav() {
    return(
        <div className="workspaces-nav">
            <CurrentWorkspaces />
            {/* <CurrentMembers /> */}
        </div>
    );
}