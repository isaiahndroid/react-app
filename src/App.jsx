import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // FETCH tasks from backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3000/tasks");
    const data = await res.json();
    setTasks(data);
  };

  // ADD task
  const addTask = async () => {
    if (!input) return;

    await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: input })
    });

    setInput("");
    fetchTasks();
  };

  // DELETE task
  const deleteTask = async (index) => {
    await fetch(`http://localhost:3000/tasks/${index}`, {
      method: "DELETE"
    });

    fetchTasks();
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

      <TaskList tasks={tasks.map(t => t.text)} onDelete={deleteTask} />
    </div>
  );
}

export default App;