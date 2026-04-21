function TaskItem ({ task, onDelete, index }) {
    return (
    <li>
        {task}
        <button onClick={() => onDelete(index)}>Delete</button>
        </li>
        );
}

export default TaskItem;