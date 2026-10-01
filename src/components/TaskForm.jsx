import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedText = taskText.trim();

    if (!trimmedText) {
      return;
    }

    onAddTask(trimmedText);
    setTaskText("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={taskText}
        onChange={(event) => setTaskText(event.target.value)}
        aria-label="New task"
      />

      <button type="submit">Add task</button>
    </form>
  );
}

export default TaskForm;