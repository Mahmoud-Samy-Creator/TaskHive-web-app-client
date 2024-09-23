import './AddWorkspaceForm.scss';
import React from "react";
import ApiReqContext from '../../../../Contexts/ApiContext';
import axios from "axios";


export default function AddWorkspaceForm({ workspaces, handler, style, styleHandler}) {
    const formRef = React.useRef(null);
    const [workspaceName, setWorkspaceName] = React.useState('');
    const {apiURL, apiConfig} = React.useContext(ApiReqContext);

    function handleNameInput(e) {
        setWorkspaceName(e.target.value);
    }
    function handleWorkspaceSubmit(e) {
        e.preventDefault();
        axios.post(apiURL, {
            "name": workspaceName,
            "description": ""
        }, apiConfig)
        .then((res) => {
            handler([...workspaces, {id: res.data.workspaceId, name: workspaceName}]);
        })
        styleHandler({display: "none"});
        setWorkspaceName('');
    }
    React.useEffect(() => {
        function handleClickOutside(event) {
            if (formRef.current && !formRef.current.contains(event.target)) {
                styleHandler({ display: "none" });
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [formRef, styleHandler]);
    return(
        <div className="add-workspace-form" style={style} ref={formRef}>
            <span>Add workspace</span>
            <form onSubmit={(e) => handleWorkspaceSubmit(e)}>
                <input type="text"
                    id="workspace-name"
                    placeholder="Enter workspace name"
                    onChange={(e) => handleNameInput(e)}
                    value={workspaceName}
                    required
                ></input>
                <button type="submit">Add</button>
            </form>
        </div>
    );
}