import React from 'react';

import './FormButton.css';

function FormButton({ text, handleClick, style, danger }) {
  return (
    <button onClick={handleClick} style={style} type="button" className={ (danger && 'danger-btn-solid') }>
      {text}
    </button>
  );
}

export default FormButton;
