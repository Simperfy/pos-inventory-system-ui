import React from 'react';

function FormInput({ formType, label, placeHolder, onChange, max, min }) {
  return (
    <div className="form-item">
      <label htmlFor="item-label">{label}:</label>
      <input
        type={formType}
        id="item-label"
        name="quantity"
        placeholder={placeHolder}
        onChange={onChange}
        max={max}
        min={min}
      />
    </div>
  );
}

export default FormInput;
