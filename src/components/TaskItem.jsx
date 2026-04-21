function TaskItem({ task, index, onDelete, onEdit }) {
  return (
    <li>
      {task}

      <div>
        <button onClick={() => onEdit(index, task)}>Edit</button>
        <button onClick={() => onDelete(index)}>Delete</button>
      </div>
    </li>
  );
}

export default TaskItem;