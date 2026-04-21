import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete }) {
    return (
        <ul>
            {tasks.map((task, index) => (
                <TaskItem 
                key={index} 
                task={task}
                onDelete={onDelete}
                index={index} 
                />
            ))}
        </ul>
    );
}

export default TaskList;