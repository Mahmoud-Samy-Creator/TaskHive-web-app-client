import React, { useState, useRef, useEffect } from "react";

export default function ProjectAddPopUp({ style, styleHandler, projectsAdded, projectAddMethod }){
    const formRef = useRef(null);
    const [newProjectDetails, setNewProjectDetails] = useState({
        name: "",
        disc: "",
        startData: "",
        endData: "",
        id: null
    })
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
        setNewProjectDetails({...newProjectDetails, endData: e.target.value})
    }
    function handleAddingProjects(e) {
        e.preventDefault();
        styleHandler({display: "none"});
        projectAddMethod([...projectsAdded, newProjectDetails]);
        setNewProjectDetails({
            name: "",
            disc: "",
            startData: "",
            endData: "",
            id: projectsAdded.length + 1,
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
                        required></input>
                </div>
                <div className="new-project-discription-input">
                    <label htmlFor='project-discription'>Discription: </label>
                    <textarea
                        type='text'
                        id='project-discription'
                        value={newProjectDetails.disc}
                        onChange={(e) => {handleProjectDisc(e)}}
                        required></textarea>
                </div>
                <div className="new-project-deadline-input">
                    <label htmlFor='start-date'>Start: </label>
                    <input
                        type="date"
                        id="start-date"
                        name="start-date"
                        value={newProjectDetails.startData}
                        onChange={(e) => {handleProjectStart(e)}}/>
                    <label htmlFor='end-date'>End: </label>
                    <input
                        type="date"
                        id="end-date"
                        name="end-date"
                        value={newProjectDetails.endData}
                        onChange={(e) => {handleProjectEnd(e)}}/>
                </div>
                <input type='submit' value='Add'></input>
            </form>
        </div>
    );
}