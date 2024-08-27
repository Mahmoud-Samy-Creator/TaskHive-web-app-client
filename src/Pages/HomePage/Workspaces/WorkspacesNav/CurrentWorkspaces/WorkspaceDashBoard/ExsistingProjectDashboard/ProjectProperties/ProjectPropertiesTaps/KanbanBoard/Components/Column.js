import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import AddTaskForm from "./AddTaskForm";

export default function Column({ className, title, column, addTaskToColumn, setColumns, columns }) {

    // Handle deletion of a task
    function handleDeleteTask(taskId) {
        const updatedTasks = column.tasks.filter((task) => task.id !== taskId);
        const updatedColumns = columns.map(col => 
            col.id === column.id ? { ...col, tasks: updatedTasks } : col
        );
        setColumns(updatedColumns);
    }

    // Handle update of a task
    function handleUpdateTask(updatedTask) {
        const updatedTasks = column.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
        );
        const updatedColumns = columns.map(col =>
            col.id === column.id ? { ...col, tasks: updatedTasks } : col
        );
        setColumns(updatedColumns);
    }

    function handleDeleteColumn(id) {
        const newColumns = columns.filter((column) => column.id !== id);
        setColumns(newColumns);
    }

    return (
        <div className={className} id='todo-lane'>
            <header>
                <h3>{title}</h3>
                <FontAwesomeIcon icon={faTrashCan} className="delete-task-icon" onClick={(e) => {
                    e.preventDefault();
                    handleDeleteColumn(column.id);
                }}/>
            </header>
            <AddTaskForm columnId={column.id} addTaskToColumn={addTaskToColumn} />
            {column.tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    parentColumn={column}
                    handleDeleteTask={handleDeleteTask}
                    updateTask={handleUpdateTask}  // Pass the update handler to the Task component
                />
            ))}
        </div>
    );
}


function Task({ task, handleDeleteTask, updateTask }) {
    const [taskPropFormDisplay, setTaskPropFormDisplay] = useState({ display: "none" });
    const formRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setTaskPropFormDisplay({ display: "none" });
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [formRef]);

    function handleFormSubmit() {
        setTaskPropFormDisplay({ display: "none" });
    }

    return (
        <div 
            onClick={() => setTaskPropFormDisplay({ display: "flex" })} 
            className="task" 
            draggable="true"
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <p className="task-name">{task.name}</p>
                <FontAwesomeIcon icon={faEraser} style={{ color: "#2c4654" }} onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTask(task.id);
                }} />
            </div>
            <div className="task-details">
                <p>Start: {task.startAt}</p>
                <p>End: {task.endAt}</p>
            </div>
            <div>
                <span className="task-progress">Progress: {task.progress}</span>
            </div>
            <div style={taskPropFormDisplay} className="task-prop-customize">
                <TaskPropForm 
                    formRef={formRef} 
                    handleFormSubmit={handleFormSubmit} 
                    task={task}
                    updateTask={updateTask}
                />
                <div className="temp">Temp</div>
            </div>
        </div>
    );
}

function TaskPropForm({ formRef, handleFormSubmit, task, updateTask }) {
    const [taskEditDetails, setTaskDetails] = useState({
        id: task.id,
        name: task.name,
        disc: task.disc || "",
        startAt: task.startAt || "",
        endAt: task.endAt || "",
        progress: task.progress || ""
    });

    function handleChange(e) {
        const { id, value } = e.target;
        setTaskDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        updateTask(taskEditDetails);  // Pass the updated task data to the parent
        handleFormSubmit();  // Close the form
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <div className="taskName-input">
                <label htmlFor="name">Name: </label>
                <input type="text" id='name' value={taskEditDetails.name} onChange={handleChange}/>
            </div>
            <div className="taskName-discription">
                <label htmlFor="disc">Disc: </label>
                <textarea id='disc' value={taskEditDetails.disc} onChange={handleChange}/>
            </div>
            <div className="taskStartDate-input">
                <label htmlFor="startAt">Start: </label>
                <input type="date" id='startAt' value={taskEditDetails.startAt} onChange={handleChange}/>
            </div>
            <div className="taskEndDate-input">
                <label htmlFor="endAt">End: </label>
                <input type="date" id='endAt' value={taskEditDetails.endAt} onChange={handleChange}/>
            </div>
            <button type='submit'>Done</button>
        </form>
    );
}
