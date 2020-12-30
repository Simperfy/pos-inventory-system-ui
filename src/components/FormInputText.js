import React from 'react';

function FormInputText({ label, placeHolder }) {
  return (
    <div className="form-item">
      <label htmlFor="item-label">{label}:</label>
      <input
        type="text"
        id="item-label"
        name="quantity"
        placeholder={placeHolder}
      />
    </div>
  );
}

export default FormInputText;
