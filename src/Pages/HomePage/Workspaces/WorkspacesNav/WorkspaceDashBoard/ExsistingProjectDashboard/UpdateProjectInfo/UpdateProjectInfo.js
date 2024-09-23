import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import './UpdateProjectInfo.scss';
import axios from "axios";

// Get auth token from storage
const storedTokenLoacal = localStorage.getItem('authToken');
const storedTokenSession = sessionStorage.getItem('authToken');

// API PARAMS
const apiURL = "http://localhost:5000/workspaces";
let AuthHeaderParam = storedTokenLoacal ? storedTokenLoacal : storedTokenSession;
const AuthHeader =  { "Authorization" : `Bearer ${AuthHeaderParam}` }
const apiConfig = { headers: AuthHeader };

export default function UpdateProjectInfo({ projectInfo, setProjectInfo, visible, handleVisiblity }) {
    const [projectUpdateInfo, setProjectUpdateInfo] = useState({
        "name": "",
        "description": "",
        "deadline": ""
    });
    const formRef = useRef(null);
    const { workspaceId, projectId } = useParams();

    // Update state when projectInfo changes
    useEffect(() => {
        setProjectUpdateInfo({
            "name": projectInfo.name || "",
            "description": projectInfo.description || "",
            "deadline": projectInfo.deadline || ""
        });
    }, [projectInfo]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (formRef.current && !formRef.current.contains(event.target)) {
                handleVisiblity({display: "none"});
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
    // Handling inputs
    function handleNameInput(e) {
        setProjectUpdateInfo({...projectUpdateInfo, name: e.target.value});
    }
    function handleDicsInput(e) {
        setProjectUpdateInfo({...projectUpdateInfo, disc: e.target.value});
    }
    function handleDeadlineInput(e) {
        setProjectUpdateInfo({...projectUpdateInfo, deadline: e.target.value});
    }

    // Handle form submission
    // Post updated info to the Project API endpoint
    function handleFormSubmission(e) {
        e.preventDefault();
        // Make API call with updated data
        axios.put(`${apiURL}/${workspaceId}/projects/${projectId}`,
            projectUpdateInfo, apiConfig
        )
        .then((res) => {
            handleVisiblity({display: "none"});
            setProjectInfo((prevData) => ({
                ...prevData, name: projectUpdateInfo.name,
                            description: projectUpdateInfo.disc,
                            deadline: projectUpdateInfo.deadline,
            }))
        })
        .catch((err) => {console.log(err)})
    }

    return(
        <div className="project-update-form" style={visible}>
            <form onSubmit={handleFormSubmission} ref={formRef}>
                <div className="project-name-edit-div">
                    <label htmlFor="project-name-edit">Name: </label>
                    <input
                        id="project-name-edit"
                        type="text"
                        value={projectUpdateInfo.name}
                        onChange={handleNameInput}
                    />
                </div>
                <div className="project-disc-edit-div">
                    <label htmlFor="project-disc-edit">Description: </label>
                    <textarea
                        id="project-disc-edit"
                        value={projectUpdateInfo.disc}
                        onChange={handleDicsInput}
                    />
                </div>
                <div className="project-deadline-edit-div">
                    <label htmlFor="project-deadline-edit">Deadline: </label>
                    <input
                        id="project-deadline-edit"
                        type="date"
                        value={projectUpdateInfo.deadline}
                        onChange={handleDeadlineInput}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}
