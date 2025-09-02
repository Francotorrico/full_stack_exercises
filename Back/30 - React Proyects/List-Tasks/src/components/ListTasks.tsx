import { useEffect, useState } from 'react'
import './ListTasks.css'
import '../App.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";


interface Task {
    id: number;
    title: string;
    description: string;
    status: boolean;
}

export default function ListTasks() {

    const [tasks, setTasks] = useState<Task[]>([])

    // controlar mi input
    // sirve para guardar el nuevo titulo y repinta vacio cada vez tecleo 
    const [newTitle, setNewTitle] = useState('')


    // para mi description
    const [newDescription, setNewDescription] = useState('')



    //para filtro
    const [filter, setFilter] = useState<"all" | "pending" | "completed">("all")

    // add element to listTask
    const addTask = (Task: Task) => {
        setTasks((prev) => [...prev, Task])
    }


    const deleteTask = (id: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== id))
    }

    //corregir input
    const formatInput = (text: string) => {
        if (!text) return '';
        let formatted = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        if (!formatted.endsWith('.')) {
            formatted += '.';
        }
        return formatted;
    }

    const handleAdd = () => {
        const title = newTitle.trim() // remove extra spaces
        if (title === '') return
        addTask({
            id: Date.now(),
            title: formatInput(newTitle),
            description: formatInput(newDescription),
            status: false
        })
        setNewTitle('')
        setNewDescription('')
    }


    // complete task
    const completeTask = (id: number) => {
        setTasks((prev) => prev.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    status: !task.status
                }
            }
            return task
        }))
    }


    useEffect(() => {
        const localStorageTasks = localStorage.getItem('tasks')
        if (localStorageTasks) {
            setTasks(JSON.parse(localStorageTasks))
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
    
    return (
        <>
            <div className='App'>

                <div className='component'>

                    <h1>List Tasks</h1>
                    <input className='league-gothic'
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                        placeholder="Write a title..."
                    />

                    <input className='league-gothic' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Write a description..." />

                    <button
                        onClick={() => handleAdd()}
                        disabled={newTitle === ''}
                        className='addTask-btn'
                    >
                        + Add Task
                    </button>

                    <div className='task-filter'>
                        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>All</button>
                        <button onClick={() => setFilter("pending")} className={filter === "pending" ? "active" : ""}>Pending</button>
                        <button onClick={() => setFilter("completed")} className={filter === "completed" ? "active" : ""}>Completed</button>

                    </div>
                </div>

                <ul className='task-list'>
                    {tasks
                        .filter((task) => {

                            if (filter === "pending") return !task.status
                            if (filter === "completed") return task.status
                            return true
                        })

                        .map((task) => (

                            <div key={task.id} className='task-item'>
                                <span className='task-date'>
                                    Created at: {new Date(task.id).toLocaleString()}
                                </span>

                                <div className='task-content'>

                                    <label className='task-label'>

                                        <input className='task-checkbox'
                                            type="checkbox"
                                            checked={task.status}
                                            onChange={() => completeTask(task.id)}

                                        />
                                        <span >
                                            <FontAwesomeIcon icon={faCheck} className="check-icon on" />
                                        </span>
                                    </label>

                                    <div className='task-text '>
                                        <h2 className='task-title'
                                        // style={
                                        //     {
                                        //         textDecoration: task.status ? "line-through" : "none",

                                        //     }
                                        // }
                                        >
                                            {task.title}</h2>

                                        <p className='task-description'>{task.description}</p>
                                    </div>
                                </div>
                                <button onClick={() => deleteTask(task.id)} className='delete-btn'>Delete</button>
                            </div>
                        ))}
                </ul>

            </div>

        </>
    )
}