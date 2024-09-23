import React from "react";
import AddWorkspaceForm from "./MainComponents/WorkSpaceCDOperations/AddWorkspaceForm/AddWorkspaceForm";
import AddWorkSpacePlaceholer from "./MainComponents/WorkSpaceCDOperations/AddWorkspace";
import DeleteWorkspaceAction from "./MainComponents/WorkSpaceCDOperations/DeleteWorkspace";
import WorkspaceDeleteDialog  from "./MainComponents/WorkspaceDeleteDialog";

// Import needed contexts
import ApiReqContext from "../Contexts/ApiContext";

// Import FontAwasomeIcons

import { Link } from "react-router-dom";
import axios from "axios";
import './WorkspacesNav.scss';

export default function WorkspacesNav() {
    const [workspaceAddFormDisplay, setworkspaceAddFormDisplay] = React.useState({display: "none"});
    const [workspaces, setWorkspace] = React.useState([]);

    // Delete modal state managment
    const [spaceIDModal, setSpaceIDModal] = React.useState();
    const [open, setOpen] = React.useState(false);

    const {apiURL, apiConfig} = React.useContext(ApiReqContext);

    // Getting Existing workspaces
    React.useEffect(() => {
        axios.get(apiURL, apiConfig)
        .then((res) => { res.status === 200 ? setWorkspace(res.data) : console.error(res.status)})
        .catch((err) => console.error(err))
    }, [apiURL, apiConfig])

    // Handle delete workspace
    function handleWorkspaceDelete(id) {
        axios.delete(`${apiURL}/${id}`, apiConfig)
        .then((res) => {
            if (res.status === 200) {
                const newWorkSpaces = workspaces.filter((space) => space.id !== id);
                setWorkspace(newWorkSpaces);
                if (newWorkSpaces.length === 0) {
                    window.location.href = '/home';
                }
            }
        })
    }

    return(
        <div className="workspaces-nav">
            <div className="cuurent-workspaces">
                <span>Workspaces</span>
                <div className="workspaces-choice">
                    <WorkspaceDeleteDialog
                        open={open}
                        setOpen={setOpen}
                        spaceIDModal={spaceIDModal}
                        handler={handleWorkspaceDelete}
                    />
                    {workspaces.map((space) => {
                        return(
                            <Link key={space.id} className="workspace-choosed" to={`/home/workspaces/${space.id}/projects`}>
                                <span className="workspace-name">{space.name}</span>
                                <DeleteWorkspaceAction
                                    setOpen={setOpen}
                                    setSpaceIDModal={setSpaceIDModal}
                                    deleteHandler={handleWorkspaceDelete}
                                    spaceId={space.id}
                                />
                            </Link>
                        );
                    })}
                    <AddWorkSpacePlaceholer styleHandler={setworkspaceAddFormDisplay}/>
                    <AddWorkspaceForm
                        workspaces={workspaces} handler={setWorkspace}
                        style={workspaceAddFormDisplay}
                        styleHandler ={setworkspaceAddFormDisplay}
                    />
                </div>
            </div>
        </div>
    );
}
