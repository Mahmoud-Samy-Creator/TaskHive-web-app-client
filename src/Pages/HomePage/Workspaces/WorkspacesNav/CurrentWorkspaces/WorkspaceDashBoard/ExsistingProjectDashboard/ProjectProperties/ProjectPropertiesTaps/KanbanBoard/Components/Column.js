import React, { useState, useEffect, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import AddTaskForm from "./AddTaskForm";
import axios from "axios";
import { IDS } from "../DashboardIDs";

export default function Column({ title, column, setColumns, columns }) {
    const ids = useContext(IDS);

    // Handle Delete task
    function handleDeleteTask(taskId) {
        console.log(taskId);
        axios.delete(`http://localhost:5000/workspaces/${ids.workspaceId}/projects/${ids.projectId}/tasks/${taskId}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('authToken')}`
                }
            }
        )
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
    // Handle Delete task

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
    // Handle update of a task


    // Adding task to a column
    function addTaskToColumn(columnId, taskName, taskId) {
        const newTask = { id: taskId, name: taskName };
        setColumns(columns.map(column =>
            column.id === columnId ? { ...column, tasks: [...column.tasks, newTask] } : column
        ));
    }
    return (
        <div className="column" id='todo-lane' data-column-title={column.title}>
            <header>
                <h3>{title}</h3>
            </header>
            <AddTaskForm column ={column} addTaskToColumn={addTaskToColumn} />
            {column.tasks.map((task, index) => (
                <Task
                    key={index}
                    task={task}
                    parentColumn={column}
                    handleDeleteTask={handleDeleteTask}
                    updateTask={handleUpdateTask}
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
            data-task-id={task.id}
            data-task-title={task.name}
            data-task-info={task}
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
        updateTask(taskEditDetails);
        handleFormSubmit();
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

