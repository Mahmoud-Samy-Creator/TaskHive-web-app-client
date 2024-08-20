import React from "react";
import './AddWorkspaceForm.scss';
import { useState, useRef, useEffect } from "react";

export default function AddWorkspaceForm({ workspaces, handler, style, styleHandler}) {
    const formRef = useRef(null);
    const [workspaceName, setWorkspaceName] = useState('');
    function handleNameInput(e) {
        setWorkspaceName(e.target.value);
    }
    function handleWorkspaceSubmit(e) {
        e.preventDefault();
        handler([...workspaces, {id: workspaces.length + 1, name: workspaceName}]);
        styleHandler({display: "none"});
        setWorkspaceName('');
    }
    useEffect(() => {
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