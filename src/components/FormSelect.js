import React from 'react';

function FormSelect() {
  return (
    <div className="form-item">
      <label htmlFor="supplier-label">Supplier:</label>
      <select name="supplier" id="supplier-label">
        <option value="1">Supplier 1</option>
        <option value="2">Supplier 2</option>
        <option value="3">Supplier 3</option>
        <option value="4">Supplier 4</option>
      </select>
    </div>
  );
}

export default FormSelect;
