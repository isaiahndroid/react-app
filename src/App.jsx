import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // FETCH tasks from backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);

    const res = await fetch("http://localhost:3000/tasks");
    const data = await res.json();

    setLoading(false);
    setTasks(data);
  };

  // ADD task
  const addTask = async () => {
  if (!input && editIndex === null) return;

  // EDIT MODE
  if (editIndex !== null) {
    await fetch(`http://localhost:3000/tasks/${editIndex}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: editText })
    });

    setEditIndex(null);
    setEditText("");
    fetchTasks();
    return;
  }

  // ADD MODE
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


  // START EDIT
  const startEdit = (index, text) => {
    setEditIndex(index);
    setEditText(text);
  };
  
  // DELETE task
  const deleteTask = async (index) => {
    await fetch(`http://localhost:3000/tasks/${index}`, {
      method: "DELETE"
    });


    fetchTasks();
  };

  return (
    <div className="container">
      <Header />
    <div className="input-section">
  {editIndex !== null ? (
    <input
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
      placeholder="Edit task"
    />
  ) : (
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Enter task"
    />
  )}

  <button onClick={addTask}>
    {editIndex !== null ? "Update" : "Add"}
  </button>
</div>
      {loading ? <p>Loading...</p> : <TaskList tasks={tasks.map(t => t.text)} onDelete={deleteTask} onEdit={startEdit} />}
    </div>
  );
}

export default App;