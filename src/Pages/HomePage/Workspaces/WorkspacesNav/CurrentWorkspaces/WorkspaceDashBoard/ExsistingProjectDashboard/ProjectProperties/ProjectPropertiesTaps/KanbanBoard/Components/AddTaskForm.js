import React, { useState, useContext } from "react";
import axios from "axios";
import { IDS } from "../DashboardIDs";

export default function AddTaskForm({ addTaskToColumn, column }) {
    const [taskInput, setTaskInput] = useState("");
    const ids = useContext(IDS);

    function handleTaskAdd(e) {
        e.preventDefault();
        axios.post(`http://localhost:5000/workspaces/${ids.workspaceId}/projects/${ids.projectId}/tasks`,
            {
                "title": taskInput,
                "body": "Description of the task.",
                "deadline": "2024-08-30",
                "state": column.title,
                "labels": [
                    "frontend",
                    "high-priority"
                ]
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('authToken')}`
                }
            }
        )
        .then((res) => {
            if (res.status === 201) {
                if (taskInput.trim()) {
                    addTaskToColumn(column.id, taskInput, res.data.taskId);
                    setTaskInput("");
                }
            }
        })
    }
    return (
        <form className='task-add-form' onSubmit={handleTaskAdd}>
            <input 
                value={taskInput} 
                type='text' 
                id='task-add-input' 
                onChange={(e) => setTaskInput(e.target.value)}
            />
            <button type='submit' style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Add</button>
        </form>
    );
}