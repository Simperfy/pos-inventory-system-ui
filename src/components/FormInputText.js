import React from 'react';

function InputText() {
  return (
    <div className="form-item">
      <label htmlFor="item-label">Qty:</label>
      <input
        type="text"
        id="item-label"
        name="quantity"
        placeholder="1 pc(s)"
      />
    </div>
  );
}

export default InputText;
