import React from 'react';

function Filter({ value, onChange }) {
  const options = [
    { id: 'all', label: 'Все' },
    { id: 'active', label: 'Невыполненные' },
    { id: 'done', label: 'Выполненные' }
  ];

  return (
    <div className="filter">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className={option.id === value ? 'active' : ''}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
