import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

// Handle delete workspaces component
export default function DeleteWorkspaceAction({ spaceId, setOpen, setSpaceIDModal }) {
    return(
        <span onClick={(e) => {
            e.preventDefault();
            setSpaceIDModal(spaceId);
            setOpen(true);            
            }}
            className="workspace-options"><FontAwesomeIcon icon={faTrashCan}/>
        </span>
    );
}
