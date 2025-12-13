import React, { useEffect, useState } from 'react';

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
    <div className={`task ${task.done ? 'task--done' : ''}`}>
      <input
        className="checkbox"
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      {editing ? (
        <input
          className="edit-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') save();
          }}
        />
      ) : (
        <p className="task__title">{task.title}</p>
      )}
      <div className="task__actions">
        {editing ? (
          <button className="small button--ghost" onClick={save}>
            Сохранить
          </button>
        ) : (
          <button className="small button--ghost" onClick={() => setEditing(true)}>
            Редактировать
          </button>
        )}
        <button className="small button--ghost" onClick={() => onDelete(task.id)}>
          Удалить
        </button>
      </div>
    </div>
  );
}

export default Task;
