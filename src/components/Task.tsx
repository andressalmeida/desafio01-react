import { Trash } from "phosphor-react";
import { TaskI } from "../App";
import styles from "./Task.module.css";

interface TaskProps {
  task: TaskI;
  onCheckTask: (taskID: string) => void;
  onDeleteTask: (taskID: string) => void;
}

export function Task({ task, onCheckTask, onDeleteTask }: TaskProps) {
  return (
    <ul>
      <li>
        <div className={styles.checkBoxList}>
          <input
            type="checkbox"
            id={task.id}
            checked={task.isChecked}
            onChange={() => onCheckTask(task.id)}
          />

          <label htmlFor={task.id}></label>

          <span
            className={
              task.isChecked === true ? styles.checked : styles.notChecked
            }
          >
            {task.content}
          </span>
        </div>

        <button onClick={() => onDeleteTask(task.id)}>
          <Trash size={20} />
        </button>
      </li>
    </ul>
  );
}
