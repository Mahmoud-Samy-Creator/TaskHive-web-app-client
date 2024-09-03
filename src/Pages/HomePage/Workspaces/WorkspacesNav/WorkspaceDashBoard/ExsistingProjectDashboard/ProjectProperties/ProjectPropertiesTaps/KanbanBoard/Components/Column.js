import React, { useState, useEffect, useRef, useContext } from "react";
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import AddTaskForm from "./AddTaskForm";
import axios from "axios";
import { IDS } from "../DashboardIDs";

// API Params
const apiURL = `http://localhost:5000/workspaces`;
const apiConfig = {
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('authToken')}`
    }
};

export default function Column({ column, setColumns, columns }) {
    const ids = useContext(IDS);

    // Handle Delete task
    function handleDeleteTask(taskId) {
        console.log(taskId);
        axios.delete(`${apiURL}/${ids.workspaceId}/projects/${ids.projectId}/tasks/${taskId}`, apiConfig)
        .then((res) => {
            if (res.status === 200) {
                const updatedTasks = column.tasks.filter((task) => task.id !== taskId);
                const updatedColumns = columns.map(col => 
                    col.id === column.id ? { ...col, tasks: updatedTasks } : col
                );
                setColumns(updatedColumns);
            }
        })
        .catch((err) => console.log(err));
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

    // Adding task to a column
    function addTaskToColumn(columnId, newTask) {
        setColumns(columns.map(column =>
            column.id === columnId ? { ...column, tasks: [...column.tasks, newTask] } : column
        ));
    }
    return (
        <div className="column" data-column-title={column.title}>
            <header>
                <h3>{column.title}</h3>
            </header>
            <AddTaskForm column ={column} addTaskToColumn={addTaskToColumn} />
            {column.tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    parentColumn={column}
                    handleDeleteTask={handleDeleteTask}
                    updateTask={handleUpdateTask}
                />
            ))}
        </div>
    );
}

// Task 
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
        <>
            <div 
                onClick={() => setTaskPropFormDisplay({ display: "flex" })}
                className="task"
                data-task-id={task.id}
                data-task-title={task.title}
                draggable="true"
            >
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <p className="task-name">{task.title}</p>
                    <FontAwesomeIcon icon={faEraser} style={{ color: "#2c4654" }} onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTask(task.id);
                    }} />
                </div>
                <div className="task-details">
                    <p>Start: {task.startAt}</p>
                    <p>End: {task.deadline}</p>
                </div>
            </div>
            {
                ReactDOM.createPortal(
                <div style={taskPropFormDisplay} className="task-prop-customize">
                    <div className="task-customization-settings">
                        <TaskPropForm 
                            formRef={formRef} 
                            handleFormSubmit={handleFormSubmit} 
                            task={task}
                            updateTask={updateTask}
                        />
                    </div>
                </div>, document.getElementById('task-customize-global'))
            }
            
        </>
    );
}

function TaskPropForm({ formRef, handleFormSubmit, task, updateTask }) {
    const [taskEditDetails, setTaskDetails] = useState({
        id: task.id,
        title: task.title,
        body: task.body || "",
        createdAt: task.createdAt || "",
        deadline: task.deadline || "",
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
        updateTask(taskEditDetails);
        handleFormSubmit();
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <div className="taskName-input">
                <label htmlFor="title">Name: </label>
                <input type="text" id='title' value={taskEditDetails.title} onChange={handleChange}/>
            </div>
            <div className="taskName-discription">
                <label htmlFor="body">Disc: </label>
                <textarea id='body' value={taskEditDetails.body} onChange={handleChange}/>
            </div>
            <div className="taskStartDate-input">
                <label htmlFor="createdAt">Start: </label>
                <input type="date" id='createdAt' value={taskEditDetails.createdAt} onChange={handleChange}/>
            </div>
            <div className="taskEndDate-input">
                <label htmlFor="deadline">End: </label>
                <input type="date" id='deadline' value={taskEditDetails.deadline} onChange={handleChange}/>
            </div>
            <button type='submit'>Done</button>
        </form>
    );
}
