import React, { useEffect, useState } from 'react';
import AddTaskForm from './components/AddTaskForm.jsx';
import Filter from './components/Filter.jsx';
import TaskList from './components/TaskList.jsx';

const STORAGE_KEY = 'lab5-tasks';

const seedTasks = [
  { id: 't1', title: 'Собрать требования к проекту', done: false },
  { id: 't2', title: 'Набросать макеты', done: true },
  { id: 't3', title: 'Настроить сборку фронтенда', done: false }
];

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : seedTasks;
  } catch (error) {
    console.warn('Не удалось прочитать localStorage', error);
    return seedTasks;
  }
}

function App() {
  const [tasks, setTasks] = useState(() => readStorage());
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    if (!title.trim()) return;
    const newTask = {
      id: crypto.randomUUID ? crypto.randomUUID() : `t-${Date.now()}`,
      title: title.trim(),
      done: false
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  const removeTask = (id) => setTasks((prev) => prev.filter((task) => task.id !== id));

  const updateTitle = (id, title) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, title: title.trim() } : task)));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'done') return task.done;
    if (filter === 'active') return !task.done;
    return true;
  });

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <p className="eyebrow">React · useState · useEffect</p>
        <h1>Список задач</h1>
        <p className="muted">
          Добавляйте, редактируйте, отмечайте выполнение, фильтруйте и сохраняйте список в localStorage.
        </p>
      </header>

      <div className="panel">
        <AddTaskForm onAdd={addTask} />
        <Filter value={filter} onChange={setFilter} />
        <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={removeTask} onUpdate={updateTitle} />
      </div>
    </div>
  );
}

export default App;
