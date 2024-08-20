import React, { useState } from "react";

export default function AddTaskForm({ columnId, addTaskToColumn }) {
    const [taskInput, setTaskInput] = useState("");

    function handleTaskAdd(e) {
        e.preventDefault();
        if (taskInput.trim()) {
            addTaskToColumn(columnId, taskInput);
            setTaskInput("");
        }
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