function TaskItem({ task, onToggle, onDelete }) {
  return (
    <article
      className={`task-item ${
        task.completed ? "completed" : ""
      }`}
    >
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={
            task.completed
              ? `Mark ${task.text} as active`
              : `Mark ${task.text} as completed`
          }
        />

        <span>{task.text}</span>
      </label>

      <button
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete task: ${task.text}`}
      >
        Delete
      </button>
    </article>
  );
}

export default TaskItem;