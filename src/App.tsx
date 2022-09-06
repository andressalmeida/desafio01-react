
import './global.css';
import styles from './App.module.css'
import { Task } from './components/Task';
import { Header } from './components/Header';

export function App() {
    return (
    <div>
        <Header />
        
        <div className={styles.container}>        
            <Task/>   
        </div>
    </div>  
)}
