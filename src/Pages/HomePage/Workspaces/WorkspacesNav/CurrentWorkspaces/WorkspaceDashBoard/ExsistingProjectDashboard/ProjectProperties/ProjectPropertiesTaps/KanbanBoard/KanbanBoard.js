import React, { useState, useEffect, useRef } from 'react';
import './KanbanBoard.scss';
import Column from './Components/Column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { IDS } from './DashboardIDs';

let taskDraggingInfo = {
    id: null,
    state: "",
    title: ""
}
export default function KanbanBoard({ workspaceId, projectId }) {
    const [columns, setColumns] = useState([]);
    const [display, setDisplay] = useState({ display: "none" });
    const [newColumnTitle, setNewColumnTitle] = useState("");
    const formRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setDisplay({ display: "none" });
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [formRef]);

    useEffect(() => {
        // Get all project tasks
        axios.get(`http://localhost:5000/workspaces/${workspaceId}/projects/${projectId}/tasks`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then((res) => {
            if (res.status === 200) {
                const fetchedTasks = res.data;
                const uniqueStates = Array.from(new Set(fetchedTasks.map(task => task.state)));
                const columnsWithTasks = uniqueStates.map((state, index) => ({
                    id: index + 1,
                    className: state.toLowerCase().replace(/\s+/g, '-'),
                    title: state,
                    tasks: fetchedTasks
                        .filter(task => task.state === state)
                        .map(task => ({
                            id: task.id,
                            name: task.title,
                            startAt: "",
                            endAt: task.deadline,
                            progress: ""
                        }))
                }));
                setColumns(columnsWithTasks);
            }
        })
        .catch((err) => {
            console.error(err);
        });
    }, [workspaceId, projectId]);

    useEffect(() => {
        function insertAboveTask(zone, mouseY) {
            const els = zone.querySelectorAll('.task:not(.is-dragging)');
            let closestTask = null;
            let closestOffset = Number.NEGATIVE_INFINITY;
    
            els.forEach((task) => {
                const { top } = task.getBoundingClientRect();
                const offset = mouseY - top;
    
                if (offset < 0 && offset > closestOffset) {
                    closestOffset = offset;
                    closestTask = task;
                }
            });
            return closestTask;
        }
    
        const handleDragOver = (e) => {
            e.preventDefault();
            const curTask = document.querySelector(".is-dragging");
            const bottomTask = insertAboveTask(e.currentTarget, e.clientY);
    
            if (!bottomTask) {
                e.currentTarget.appendChild(curTask);
            } else {
                e.currentTarget.insertBefore(curTask, bottomTask);
            }
        };
    
        const handleDrop = (e, targetColumn) => {
            e.preventDefault();
            taskDraggingInfo.state = targetColumn.getAttribute('data-column-title');
            console.log("Task dropped in column:", taskDraggingInfo.state);
        };
    
        const draggables = document.querySelectorAll('.task');
        const droppables = document.querySelectorAll('.column');
    
        draggables.forEach((task) => {
            task.addEventListener('dragstart', () => {
                task.classList.add('is-dragging');
            });
            task.addEventListener('dragend', () => {
                task.classList.remove('is-dragging');
                taskDraggingInfo.id = task.getAttribute('data-task-id');
                taskDraggingInfo.title = task.getAttribute('data-task-title');
    
                console.log(`Task dragging id: ${taskDraggingInfo.id}`);
                console.log(`Task dragging Title: ${taskDraggingInfo.title }`);

                // Handle the backEnd edit
                axios.put(`http://localhost:5000/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskDraggingInfo.id}`,
                    {
                        "title": taskDraggingInfo.title,
                        "body": "Updated description of the task.",
                        "deadline": "2024-09-01",
                        "state": taskDraggingInfo.state,
                        "labels": [
                            "backend",
                            "urgent"
                        ]
                    },
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('authToken')}`
                        }
                    }
                )
                .then((res) => {
                    console.log(res)
                })
            });
        });
    
        droppables.forEach((zone) => {
            zone.addEventListener('dragover', handleDragOver);
            zone.addEventListener('drop', (e) => handleDrop(e, zone));
        });
    
        return () => {
            draggables.forEach((task) => {
                task.removeEventListener('dragstart', () => {});
                task.removeEventListener('dragend', () => {});
            });
            droppables.forEach((zone) => {
                zone.removeEventListener('dragover', handleDragOver);
                zone.removeEventListener('drop', () => {});
            });
        };
    }, [columns, projectId, workspaceId]);
    

    function handleSubmit(e) {
        e.preventDefault();
        if (newColumnTitle.trim()) {
            const newColumn = {
                id: columns.length + 1,
                className: newColumnTitle.toLowerCase().replace(/\s+/g, '-'),
                title: newColumnTitle,
                tasks: []
            };
            setColumns([...columns, newColumn]);
            setNewColumnTitle("");
            setDisplay({ display: "none" });
        }
    }

    return (
        <IDS.Provider value={{workspaceId, projectId}}>
            <div className="kanban-board">
                <div className="columns">
                    {columns.map((column) => (
                        <Column
                            title={column.title}
                            key={column.id}
                            column={column}
                            columns={columns}
                            setColumns={setColumns}
                        />
                    ))}
                    {/* Adding new column */}
                    <div className='add-column-element' onClick={() => setDisplay({ display: "flex" })}>
                        <div>
                            <FontAwesomeIcon icon={faPlus} />
                            <span>Add column</span>
                        </div>
                        <form style={display} ref={formRef} onSubmit={handleSubmit}>
                            <input 
                                type='text' 
                                placeholder='name' 
                                value={newColumnTitle}
                                onChange={(e) => setNewColumnTitle(e.target.value)} 
                            />
                            <button type='submit'>Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </IDS.Provider>
    );
}
