import styles from './Task.module.css';
import Clipboard from '../assets/Clipboard.svg'
import { PlusCircle } from 'phosphor-react';
import { Trash } from 'phosphor-react'
import { useState } from 'react';
import { ChangeEvent, FormEvent, InvalidEvent } from 'react';

import {v4 as uuidv4} from 'uuid'


interface TaskProps {
    id: string,
    content: string,
    isChecked: boolean,
}

export function Task() {

    const [tasks, setTasks] = useState<TaskProps[]>([])

    const [inputNewText, setInputNewText] = useState('')

    const [taskCount, setTaskCount] = useState(0)

    const isTaskEmpty = tasks.length === 0

    function handleCreateTask(event: FormEvent) {
        event.preventDefault()

        if(inputNewText) {
            const newTask = {
                id: uuidv4(),
                content: inputNewText,
                isChecked: false
            }

            setTasks([...tasks, newTask])
            setInputNewText('')

            setTaskCount((state) => {return state + 1})
        } else {
            alert('Este campo é obrigatório')
        }
        
    }

    function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        
        setInputNewText(event.target.value)
    }

    function handleCheckTask(id: string) {
        const checkedTask = tasks.map(task => task.id === id ? {
            ...task,
            isChecked: !task.isChecked
        } : task)

        setTasks(checkedTask)
    }

    function handleDeleteTask(id: string) {
        const filteredTasks = tasks.filter(task => task.id !== id)

        setTasks(filteredTasks)
        setTaskCount(filteredTasks.length)
    }
    return (
 
        <div className={styles.taskContainer}>

            <form className={styles.newTaskForm} >
                <textarea
                    name="newtask"
                    placeholder='Adicione uma nova tarefa'
                    value={inputNewText}
                    onChange={handleInputChange}
                    required
                />
                <button onClick={handleCreateTask}>Criar 
                    <PlusCircle size={18} /> 
                </button>
            </form>

            <div className={styles.listTitle}>
                    <div className={styles.countAllTasks}>
                        <strong>Tarefas criadas</strong>
                        <span>{taskCount}</span>
                    </div>
                    
                    <div className={styles.countCheckTasks}>
                        <strong>Concluídas</strong>
                        <span>0</span>
                    </div>
            </div>

            <div className={isTaskEmpty ? styles.emptyTasks : styles.emptyTasksFalse}>
            
                <img src={Clipboard} alt="" />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <p>Crie tarefas e organize seus itens a fazer</p>

            </div>

            <div className={styles.listTasks}>
                
                {tasks.map((task, index) => {
                    if (!isTaskEmpty) {
                    return ( 
                        <ul key={task.id}>
                            <li>
                                <div className={styles.checkBoxList} >
                                    <input 
                                        type="checkbox" 
                                        id={index.toString()} 
                                        checked={task.isChecked}
                                        onChange={() => handleCheckTask(task.id)}
                                      />
                                      
                                    <label htmlFor={index.toString()}>   
                                    <span>
                                        {task.content}
                                    </span>
                                    </label>
                                    
                                </div>

                                <button onClick={() => handleDeleteTask(task.id)}>
                                    <Trash size={20} />
                                </button>
                            </li>
                        </ul>
                    )}
           
                })}
            </div>
        </div>
        
        
    )
}