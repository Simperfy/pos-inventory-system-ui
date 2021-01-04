import React from 'react';

function FormInput({formType, label, placeHolder, onChange, max, min, value, hideZero}) {
  return (
    <div className="form-item">
      <label htmlFor="item-label">{label}:</label>
      <input
        value={(hideZero && value === 0) ? '' : value}
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
