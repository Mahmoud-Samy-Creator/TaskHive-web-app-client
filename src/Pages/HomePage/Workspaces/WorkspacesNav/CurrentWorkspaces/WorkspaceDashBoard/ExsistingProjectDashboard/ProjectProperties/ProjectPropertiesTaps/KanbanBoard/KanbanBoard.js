import React, { useState, useEffect, useRef } from 'react';
import './KanbanBoard.scss';
import Column from './Components/Column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

export default function KanbanBoard({ workspaceId , projectId, projectTasks, setProjectTasks}) {
    
    const stateValues = projectTasks.map(task => task.state);
    console.log(stateValues)


    const columnPlaceHolder = [
        { id: 1, className: "to-do", title: "To do", tasks: [
            {
                id: uuidv4(),
                name: "Create project",
                startAt: "",
                endAt: "",
                progrees: ""
            },
        ]},
        { id: 2, className: "in-progress", title: "In progress", tasks: [
            {
                id: uuidv4(),
                name: "Read the news",
                startAt: "",
                endAt: "",
                progrees: ""
            },
        ] },
        { id: 3, className: "agreed", title: "Agreed", tasks: [
            {
                id: uuidv4(),
                name: "Doing homework",
                startAt: "",
                endAt: "",
                progrees: ""
            },
        ] },
    ]
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
        const draggables = document.querySelectorAll('.task');
        const droppables = document.querySelectorAll('.column');
        draggables.forEach((task) => {
            task.addEventListener('dragstart', () => {
                task.classList.add('is-dragging');
            });
            task.addEventListener('dragend', () => {
                task.classList.remove('is-dragging');
            });
        });
        droppables.forEach((zone) => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                const bottomTask = insertAboveTask(zone, e.clientY);
                const curTask = document.querySelector(".is-dragging");

                if (!bottomTask) {
                    zone.appendChild(curTask);
                } else {
                    zone.insertBefore(curTask, bottomTask);
                }
            });
        });
        return () => {
            draggables.forEach((task) => {
                task.removeEventListener('dragstart', () => {});
                task.removeEventListener('dragend', () => {});
            });
            droppables.forEach((zone) => {
                zone.removeEventListener('dragover', () => {});
            });
        }
    }, [columns]);

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

    function addTaskToColumn(columnId, taskName) {
        const newTask = { id: uuidv4(), name: taskName };
        setColumns(columns.map(column =>
            column.id === columnId ? { ...column, tasks: [...column.tasks, newTask] } : column
        ));
    }

    return (
        <div className="kanban-board">
            <div className="columns">
                {columns.map((column) => (
                    <Column 
                        className={`${column.className} column`}
                        title={column.title}
                        key={column.id}
                        column={column}
                        addTaskToColumn={addTaskToColumn}
                        columns = {columns}
                        setColumns={setColumns}
                    />
                ))}
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
    );
}
