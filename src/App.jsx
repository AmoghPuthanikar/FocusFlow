import { useEffect, useState } from "react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import ThemeToggle from "./components/ThemeToggle";

const STORAGE_KEY = "focusflow.tasks";
const THEME_KEY = "focusflow.theme";

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);

      if (!savedTasks) {
        return [];
      }

      const parsedTasks = JSON.parse(savedTasks);

      return Array.isArray(parsedTasks) ? parsedTasks : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("all");

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || "light";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  function addTask(taskText) {
    const newTask = {
      id: crypto.randomUUID(),
      text: taskText,
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task,
      ),
    );
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light",
    );
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  const remainingTasks = tasks.filter(
    (task) => !task.completed,
  ).length;

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>FocusFlow</h1>
          <p>Focus on what matters today.</p>
        </div>

        <ThemeToggle
          theme={theme}
          onToggle={toggleTheme}
        />
      </header>

      <main className="app-main">
        <TaskForm onAddTask={addTask} />

        <div className="task-summary">
          <span>
            {remainingTasks}{" "}
            {remainingTasks === 1 ? "task" : "tasks"} remaining
          </span>
        </div>

        <FilterBar
          currentFilter={filter}
          onFilterChange={setFilter}
        />

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </main>
    </div>
  );
}

export default App;