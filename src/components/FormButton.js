import React from 'react';

import './FormButton.css';

function FormButton({ text, handleClick, style, color, solid}) {
  return (
    <button onClick={handleClick} style={style} type="button" className={ `${color}-btn${(solid ? '-solid' : '')}` }>
      {text}
    </button>
  );
}

export default FormButton;
