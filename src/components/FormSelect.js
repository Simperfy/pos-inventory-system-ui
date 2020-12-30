import React from 'react';

function FormSelect({ label, options }) {
  return (
    <div className="form-item">
      <label htmlFor="supplier-label">{label}:</label>
      <select name="supplier" id="supplier-label">
        {options.map((s) => (
          <option key={s.id} value={s.value}>
            {s.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FormSelect;
