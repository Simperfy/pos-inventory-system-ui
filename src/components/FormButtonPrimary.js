import React from 'react';

import './FormButtonPrimary.css';

function FormButtonPrimary({ text, handleClick, style }) {
  return (
    <button onClick={handleClick} style={style} type="button" className="add-btn">
      {text}
    </button>
  );
}

export default FormButtonPrimary;
