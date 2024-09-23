// Handle adding workspaces component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddWorkSpacePlaceholer({ styleHandler }) {
    return(
        <div className="add-workspace" onClick={() => styleHandler({display: "block"})}>
            <div>
                <FontAwesomeIcon icon={faPlus} style={{marginRight: "10px"}}/>
                <span>Add work space</span>
            </div>
        </div>
    )
}