import React from 'react';

import './FormButtonCancel.css';

function FormButtonCancel({ handleCancel, solid, style }) {
  return (
    <button
      onClick={handleCancel}
      type="button"
      style={style}
      className={solid ? 'cancel-btn-solid' : 'cancel-btn'}
    >
      Cancel
    </button>
  );
}

export default FormButtonCancel;
