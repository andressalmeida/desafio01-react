import styles from './Task.module.css';
import Clipboard from '../assets/Clipboard.svg'
import { PlusCircle } from 'phosphor-react';
import { Trash } from 'phosphor-react'
import { useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';

export function Task() {

    const [text, setText] = useState('')

    function handleCreateTask(event: FormEvent) {
        event.preventDefault()
        console.log(text)
    }

    function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        setText(event.target.value)
    }

    return (
 
        <div className={styles.taskContainer}>

            <form className={styles.newTaskForm} >
                <textarea
                    name="newtask"
                    placeholder='Adicione uma nova tarefa'
                    onChange={handleInputChange}
                />
                <button onClick={handleCreateTask}>Criar 
                    <PlusCircle size={18} /> 
                </button>
            </form>

            <div className={styles.listTasks}>

                <div className={styles.listTitle}>
                    <div className={styles.countAllTasks}>
                        <strong>Tarefas criadas</strong>
                        <span> 0</span>
                    </div>
                    
                    <div className={styles.countCheckTasks}>
                        <strong>Concluídas</strong>
                        <span>0</span>
                    </div>
                </div>

                <div className={styles.emptyTasks}>
                <img src={Clipboard} alt="" />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <p>Crie tarefas e organize seus itens a fazer</p>
                </div>

                <ul>
                    <li>
                        <div className={styles.checkBoxList}>
                            <input type="checkbox" id="checkbox1" />
                            <label htmlFor="checkbox1"> </label>
                        </div>

                        <button>
                            <Trash size={20} />
                        </button>
                    </li>

                    <li>
                        <div className={styles.checkBoxList}>
                            <input type="checkbox" id="checkbox2" />
                            <label htmlFor="checkbox2"> </label>
                        </div>

                        <button>
                            <Trash size={20} />
                        </button>
                    </li>

                    <li>
                        <div className={styles.checkBoxList}>
                            <input type="checkbox" id="checkbox3" />
                            <label htmlFor="checkbox3"> </label>
                            <span>
                                lorem ipsum dolor sit amet, consectetur adip
                            </span>
                        </div>

                        <button>
                            <Trash size={20} />
                        </button>
                    </li>

                </ul>

            </div>
        </div>
        
        
    )
}