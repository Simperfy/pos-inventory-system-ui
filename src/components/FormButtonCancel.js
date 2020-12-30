import React from 'react';

function FormButtonCancel({ handleCancel }) {
  return (
    <button onClick={handleCancel} type="button" className="cancel-item">
      Cancel
    </button>
  );
}

export default FormButtonCancel;
