import React, { useState, useContext } from "react";
import axios from "axios";
import { IDS } from "../DashboardIDs";

// Get auth token from storage
const storedTokenLoacal = localStorage.getItem('authToken');
const storedTokenSession = sessionStorage.getItem('authToken');

// API PARAMS
const apiURL = "http://localhost:5000/workspaces";
let AuthHeaderParam = storedTokenLoacal ? storedTokenLoacal : storedTokenSession;
const AuthHeader =  { "Authorization" : `Bearer ${AuthHeaderParam}` }
const apiConfig = { headers: AuthHeader };

export default function AddTaskForm({ addTaskToColumn, column }) {
    const [taskInput, setTaskInput] = useState("");
    const ids = useContext(IDS);

    // This function is for adding new task to the column
    function handleTaskAdd(e) {
        e.preventDefault();
        const newTaskDetails = {
            "title": taskInput,
            "body": "",
            "deadline": "2024-08-30",
            "state": column.title,
            "labels": []
        };
        axios.post(`${apiURL}/${ids.workspaceId}/projects/${ids.projectId}/tasks`, newTaskDetails ,apiConfig
        )
        .then((res) => {
            if (res.status === 201) {
                if (taskInput.trim()) {
                    const newTask = {
                        id: res.data.taskId,
                        title: taskInput,
                        body: "",
                        startAt: "",
                        deadline: "",
                        createdAt: "",
                        labels: [],
                        state: column.title,
                    };
                    addTaskToColumn(column.id, newTask);
                    setTaskInput("");
                }
            }
        })
        .catch(error => {
            console.error("Error adding task:", error);
        });
    }
    return (
        <form className='task-add-form' onSubmit={handleTaskAdd}>
            <input 
                value={taskInput} 
                type='text' 
                id='task-add-input' 
                onChange={(e) => setTaskInput(e.target.value)}
            />
            <button type='submit'>Add</button>
        </form>
    );
}