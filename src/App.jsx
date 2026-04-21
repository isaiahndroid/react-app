import { useState } from "react";
import Header from "./components/Header";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState(["Learn React", "Build Projects"]);

  return (
    <div>
      <Header />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;