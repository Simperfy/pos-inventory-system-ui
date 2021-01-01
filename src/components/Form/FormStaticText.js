import React from 'react';

function FormStaticText({ text, textBelow }) {
  return (
    <div className="form-item">
      <p>Item: {text}</p>
      <span className="item-barcode">{textBelow}</span>
    </div>
  );
}

export default FormStaticText;
