import React, { useState, useEffect } from "react";
import AddWorkspaceForm from "./AddWorkspaceForm/AddWorkspaceForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CurrentWorkspaces() {
    const [workspaceAddFormDisplay, setworkspaceAddFormDisplay] = useState({display: "none"});
    const [workspaces, setWorkspace] = useState([])
    function handleWorkspaceDelete(id) {
        axios.delete(`http://localhost:5000/workspaces/${id}`, {
            headers: {
                "Authorization":`Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then(() => {
            const newWorkSpaces = workspaces.filter((space) => space.id !== id);
            setWorkspace(newWorkSpaces);
        })
    }
    useEffect(() => {
        axios.get('http://localhost:5000/workspaces', {
            headers: {
                "Authorization":`Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then((res) => setWorkspace(res.data))
    }, [])
    return(
        <div className="cuurent-workspaces">
            <span>Workspaces</span>
            <div className="workspaces-choice">
                {workspaces.map((space) => {
                    return(
                        <Link key={space.id} className="workspace-choosed" to={`/home/workspaces/${space.id}`}>
                            <span className="workspace-name">{space.name}</span>
                            <DeleteWorkspaceAction deleteHandler={handleWorkspaceDelete} spaceId={space.id}/>
                        </Link>
                    );
                })}
                <AddWorkSpacePlaceholer styleHandler={setworkspaceAddFormDisplay}/>
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

function AddWorkSpacePlaceholer({ styleHandler }) {
    return(
        <div className="add-workspace" onClick={() => styleHandler({display: "block"})}>
            <div>
                <FontAwesomeIcon icon={faPlus} style={{marginRight: "10px"}}/>
                <span>Add work space</span>
            </div>
        </div>
    )
}

function DeleteWorkspaceAction({ deleteHandler, spaceId }) {
    return(
        <span onClick={(e) => {
            e.preventDefault();
            deleteHandler(spaceId)
            }}
                className="workspace-options"><FontAwesomeIcon icon={faTrashCan}/>
        </span>
    );
}