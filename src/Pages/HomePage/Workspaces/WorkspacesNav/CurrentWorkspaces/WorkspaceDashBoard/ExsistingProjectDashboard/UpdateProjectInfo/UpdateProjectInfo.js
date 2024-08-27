import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import './UpdateProjectInfo.scss';
import axios from "axios";

export default function UpdateProjectInfo({ projectInfo, visible, handleVisiblity }) {
    const [projectUpdateInfo, setProjectUpdateInfo] = useState({
        name: "",
        disc: "",
        deadline: ""
    });
    const formRef = useRef(null);
    const { workspaceId, projectId } = useParams();

    // Update state when projectInfo changes
    useEffect(() => {
        setProjectUpdateInfo({
            name: projectInfo.name || "",
            disc: projectInfo.description || "",
            deadline: projectInfo.deadline || ""
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
        axios.put(`http://localhost:5000/workspaces/${workspaceId}/projects/${projectId}`,
            {
                "name": `${projectUpdateInfo.name}`,
                "description": `${projectUpdateInfo.disc}`,
                "deadline": `${projectUpdateInfo.deadline}`
            },
            {
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem('authToken')}`
                }
            }
        )
        .then((res) => {
            console.log(res)
            handleVisiblity({display: "none"});
        })
        .then((err) => {
            console.log(err)
        })
        console.log("Updated project info:", projectUpdateInfo);
    }

    return(
        <div className="project-update-form" style={visible}>
            <form onSubmit={handleFormSubmission} ref={formRef}>
                <div className="project-name-edit-div">
                    <label htmlFor="project-name-edit">Name: </label>
                    <input
                        type="text"
                        id="project-name-edit"
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
                        type="date"
                        id="project-deadline-edit"
                        value={projectUpdateInfo.deadline}
                        onChange={handleDeadlineInput}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}
