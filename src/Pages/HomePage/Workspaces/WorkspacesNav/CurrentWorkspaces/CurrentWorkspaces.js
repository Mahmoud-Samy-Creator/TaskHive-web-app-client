import React from "react";
import AddWorkspaceForm from "./AddWorkspaceForm/AddWorkspaceForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CurrentWorkspaces() {
    const [workspaceAddFormDisplay, setworkspaceAddFormDisplay] = useState({display: "none"});
    const [workspaces, setWorkspace] = useState(
        [
            { id: 1, name: "Workspace [1]" },
            { id: 2, name: "Workspace [2]" },
            { id: 3, name: "Workspace [3]" },
        ])
    function handleWorkspaceDelete(id) {
        const newWorkSpaces = workspaces.filter((space) => space.id !== id);
        setWorkspace(newWorkSpaces);
    }
    return(
        <div className="cuurent-workspaces">
            <span>Workspaces</span>
            <div className="workspaces-choice">
                {workspaces.map((space) => {
                    return(
                        <Link key={space.id} className="workspace-choosed" to={`/home/workspaces/${space.id}`}>
                            <span className="workspace-name">{space.name}</span>
                            <span onClick={(e) => {
                                e.preventDefault();
                                handleWorkspaceDelete(space.id)
                            }}
                                className="workspace-options"><FontAwesomeIcon icon={faTrashCan} />
                            </span>
                        </Link>
                    );
                })}
                <div className="add-workspace" onClick={() => setworkspaceAddFormDisplay({display: "block"})}>
                    <div>
                        <FontAwesomeIcon icon={faPlus} style={{marginRight: "10px"}}/>
                        <span>Add work space</span>
                    </div>
                </div>
                <AddWorkspaceForm
                    workspaces={workspaces}
                    handler={setWorkspace}
                    style={workspaceAddFormDisplay}
                    styleHandler ={setworkspaceAddFormDisplay}
                />
            </div>
        </div>
    );
}
