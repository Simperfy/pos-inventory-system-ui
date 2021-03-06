import React from 'react';

function FormSelect({label, options, value, onChange}) {
  return (
    <div className="form-item">
      <label htmlFor="supplier-label">{label}:</label>
      <select value={value} onChange={onChange} name="supplier" id="supplier-label">
        {options.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
    </div>
  );
}

export default FormSelect;
