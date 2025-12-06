const { useState, useEffect } = React;
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
  } catch (e) {
    console.warn('Не удалось прочитать localStorage', e);
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
    setTasks((prev) => prev.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  };

  const removeTask = (id) => setTasks((prev) => prev.filter((task) => task.id !== id));

  const updateTitle = (id, title) => {
    setTasks((prev) => prev.map((task) => task.id === id ? { ...task, title: title.trim() } : task));
  };

  const filtered = tasks.filter((task) => {
    if (filter === 'done') return task.done;
    if (filter === 'active') return !task.done;
    return true;
  });

  return (
    React.createElement('div', { className: 'panel' },
      React.createElement(AddTaskForm, { onAdd: addTask }),
      React.createElement(Filter, { value: filter, onChange: setFilter }),
      React.createElement(TaskList, {
        tasks: filtered,
        onToggle: toggleTask,
        onDelete: removeTask,
        onUpdate: updateTitle
      })
    )
  );
}

function AddTaskForm({ onAdd }) {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  };

  return (
    React.createElement('form', { className: 'form', onSubmit: handleSubmit },
      React.createElement('input', {
        className: 'input',
        type: 'text',
        placeholder: 'Новая задача',
        value,
        onChange: (e) => setValue(e.target.value)
      }),
      React.createElement('button', { className: 'button', type: 'submit' }, 'Добавить')
    )
  );
}

function Filter({ value, onChange }) {
  const options = [
    { id: 'all', label: 'Все' },
    { id: 'active', label: 'Невыполненные' },
    { id: 'done', label: 'Выполненные' }
  ];

  return (
    React.createElement('div', { className: 'filter' },
      options.map((option) =>
        React.createElement('button', {
          key: option.id,
          type: 'button',
          className: option.id === value ? 'active' : '',
          onClick: () => onChange(option.id)
        }, option.label)
      )
    )
  );
}

function TaskList({ tasks, onToggle, onDelete, onUpdate }) {
  if (tasks.length === 0) {
    return React.createElement('div', { className: 'empty' }, 'Нет задач в выбранном фильтре');
  }

  return (
    React.createElement('div', { className: 'list' },
      tasks.map((task) =>
        React.createElement(Task, {
          key: task.id,
          task,
          onToggle,
          onDelete,
          onUpdate
        })
      )
    )
  );
}

function Task({ task, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const save = () => {
    if (!draft.trim()) return;
    onUpdate(task.id, draft);
    setEditing(false);
  };

  useEffect(() => setDraft(task.title), [task.title]);

  return (
    React.createElement('div', { className: `task ${task.done ? 'task--done' : ''}` },
      React.createElement('input', {
        className: 'checkbox',
        type: 'checkbox',
        checked: task.done,
        onChange: () => onToggle(task.id)
      }),
      editing
        ? React.createElement('input', {
            className: 'edit-input',
            value: draft,
            onChange: (e) => setDraft(e.target.value),
            onKeyDown: (e) => {
              if (e.key === 'Enter') save();
            }
          })
        : React.createElement('p', { className: 'task__title' }, task.title),
      React.createElement('div', { className: 'task__actions' },
        editing
          ? React.createElement('button', { className: 'small button--ghost', onClick: save }, 'Сохранить')
          : React.createElement('button', { className: 'small button--ghost', onClick: () => setEditing(true) }, 'Редактировать'),
        React.createElement('button', { className: 'small button--ghost', onClick: () => onDelete(task.id) }, 'Удалить')
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
