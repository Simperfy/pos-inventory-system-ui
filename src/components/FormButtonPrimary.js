import React from 'react';

import './FormButtonPrimary.css';

function FormButtonPrimary({ text, handleAdd, style }) {
  return (
    <button onClick={handleAdd} style={style} type="button" className="add-btn">
      {text}
    </button>
  );
}

export default FormButtonPrimary;
