import React, { useState } from 'react';

function AddTaskForm({ onAdd }) {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder="Новая задача"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button className="button" type="submit">
        Добавить
      </button>
    </form>
  );
}

export default AddTaskForm;
