import './AddWorkspaceForm.scss';
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function AddWorkspaceForm({ workspaces, handler, style, styleHandler}) {
    const formRef = useRef(null);
    const [workspaceName, setWorkspaceName] = useState('');
    function handleNameInput(e) {
        setWorkspaceName(e.target.value);
    }
    function handleWorkspaceSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/workspaces', {
            "name": workspaceName,
            "description": ""
        },
        {
            headers: {
                "Authorization":`Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then((res) => {
            handler([...workspaces, {id: res.data.workspaceId, name: workspaceName}]);
        })
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