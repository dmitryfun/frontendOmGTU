import React from 'react';
import Task from './Task.jsx';

function TaskList({ tasks, onToggle, onDelete, onUpdate }) {
  if (tasks.length === 0) {
    return <div className="empty">Нет задач в выбранном фильтре</div>;
  }

  return (
    <div className="list">
      {tasks.map((task) => (
        <Task key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
}

export default TaskList;
