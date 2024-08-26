import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function ProjectAddPopUp({ style, styleHandler, projectsAdded, projectAddMethod, workspaceId }){
    const today = new Date().toISOString().split('T')[0];
    const formRef = useRef(null);
    const [newProjectDetails, setNewProjectDetails] = useState({
        name: "",
        disc: "",
        startData: today,
        endDate: "",
        _id: null
    })

    // Handling the new Project properties
    function handleProjectName(e) {
        setNewProjectDetails({...newProjectDetails, name: e.target.value})
    }
    function handleProjectDisc(e) {
        setNewProjectDetails({...newProjectDetails, disc: e.target.value})
    }
    function handleProjectStart(e) {
        setNewProjectDetails({...newProjectDetails, startData: e.target.value})
    }
    function handleProjectEnd(e) {
        setNewProjectDetails({...newProjectDetails, endDate: e.target.value})
    }

    // Adding the project to the database
    function handleAddingProjects(e) {
        e.preventDefault();
        styleHandler({display: "none"});
        axios.post(`http://localhost:5000/workspaces/${workspaceId}/projects`,
            {
                "name": newProjectDetails.name,
                "description": newProjectDetails.disc,
                "deadline": newProjectDetails.endDate
            },
            {
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem('authToken')}`
                }
            })
            .then((res) => {
                console.log(res);
                projectAddMethod([...projectsAdded, {...newProjectDetails, _id: res.data["projectId"]}]);
            })
            .catch((err) => console.error(err));
        setNewProjectDetails({
            name: "",
            disc: "",
            startData: today,
            endDate: "",
        })
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
        <div className='add-project' ref={formRef} style={style}>
            <h2>Project details</h2>
            <form onSubmit={handleAddingProjects}>
                <div className="new-project-name-input">
                    <label htmlFor='project-name'>Name: </label>
                    <input
                        type='text'
                        id='project-name'
                        value={newProjectDetails.name}
                        onChange={(e) => {handleProjectName(e)}}
                        required
                    />
                </div>
                <div className="new-project-discription-input">
                    <label htmlFor='project-discription'>Discription: </label>
                    <textarea
                        type='text'
                        id='project-discription'
                        value={newProjectDetails.disc}
                        onChange={(e) => {handleProjectDisc(e)}}
                        required
                    />
                </div>
                <div className="new-project-deadline-input">
                    <label htmlFor='start-date'>Start: </label>
                    <input
                        type="date"
                        id="start-date"
                        name="start-date"
                        value={newProjectDetails.startData}
                        onChange={(e) => {handleProjectStart(e)}}
                    />
                    <label htmlFor='end-date'>End: </label>
                    <input
                        type="date"
                        id="end-date"
                        name="end-date"
                        value={newProjectDetails.endDate}
                        onChange={(e) => {handleProjectEnd(e)}}
                    />
                </div>
                <input type='submit' value='Add' />
            </form>
        </div>
    );
}