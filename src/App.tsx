import "./global.css";
import styles from "./App.module.css";
import { Tasks } from "./components/Tasks";
import { Header } from "./components/Header";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
export interface TaskI {
  id: string;
  content: string;
  isChecked: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<TaskI[]>([]);

  function createTask(taskContent: string) {
    const newTask = {
      id: uuidv4(),
      content: taskContent,
      isChecked: false,
    };
    setTasks([...tasks, newTask]);
  }

  function checkTask(id: string) {
    const checkedTask = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            isChecked: !task.isChecked,
          }
        : task
    );

    setTasks(checkedTask);
  }

  function deleteTask(id: string) {
    const filteredTasks = tasks.filter((task) => task.id !== id);

    setTasks(filteredTasks);
  }

  return (
    <div>
      <Header />

      <div className={styles.container}>
        <Tasks
          onCreateTask={createTask}
          onCheckTask={checkTask}
          onDeleteTask={deleteTask}
          tasks={tasks}
        />
      </div>
    </div>
  );
}
