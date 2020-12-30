import React from 'react';

import './FormButtonConfirm.css';

function FormButtonConfirm({ handleConfirm, style }) {
  return (
    <button onClick={handleConfirm} style={style} type="button" className="confirm-btn">
      Confirm
    </button>
  );
}

export default FormButtonConfirm;
