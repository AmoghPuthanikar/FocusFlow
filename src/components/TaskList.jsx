import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <section className="task-list" aria-live="polite">
        <p>
          No tasks here. Add something you want to focus on.
        </p>
      </section>
    );
  }

  return (
    <section className="task-list" aria-live="polite">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

export default TaskList;