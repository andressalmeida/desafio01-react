import styles from './Tasks.module.css';
import Clipboard from '../assets/Clipboard.svg'
import { PlusCircle } from 'phosphor-react';
import { useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';


import { TaskI } from '../App';
import { Task } from './Task';

interface TaskProps {
    tasks: TaskI[]
    onCreateTask: (taskContent: string) => void
    onCheckTask: (taskID: string) => void
    onDeleteTask: (taskID: string) => void
}

export function Tasks({tasks, onCreateTask, onCheckTask, onDeleteTask}: TaskProps) {

    
    const [inputNewText, setInputNewText] = useState('')
    const countAllTasks = tasks.length
    const isTaskEmpty = tasks.length === 0
    const filteredCheckedTasks = tasks.filter(task => task.isChecked === true).length
    


    function handleCreateTask(event: FormEvent) {
        event.preventDefault()
        
        if(inputNewText) {
            onCreateTask(inputNewText)
        setInputNewText('')
        } else {
            alert('Favor preencher o campo')
        }
        
    }

    function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        
        setInputNewText(event.target.value)
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
                        <span>{countAllTasks}</span>
                    </div>
                    
                    <div className={styles.countCheckTasks}>
                        <strong>Concluídas</strong>
                        <span>{filteredCheckedTasks} de {countAllTasks}</span>
                    </div>
            </div>

            <div className={isTaskEmpty ? styles.emptyTasks : styles.emptyTasksFalse}>
            
                <img src={Clipboard} alt="" />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <p>Crie tarefas e organize seus itens a fazer</p>

            </div>

            <div className={styles.listTasks}>
                
                {tasks.map((task) => {
                    if (!isTaskEmpty) {
                    return ( 
                        <Task
                        key={task.id}
                        task={task}
                        onCheckTask={onCheckTask}
                        onDeleteTask={onDeleteTask} /> //propriedade onDeleteTask === Parametro onDeleteTask (recebido pela função)
                    )}
           
                })}
            </div>
        </div>       
    )
}