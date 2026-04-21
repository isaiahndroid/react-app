import { useState } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input) return;

    setTasks([...tasks, input]);
    setInput(""); 
  };

  const deleteTask = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div>
      <Header />

      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task"
        />
        <button onClick={addTask}>Add Task</button>

      <TaskList tasks={tasks} onDelete={deleteTask} />
    </div>
  );
}

export default App;