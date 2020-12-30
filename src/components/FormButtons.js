import React from 'react';

function FormButtons({handleAdd, handleCancel}) {
  return (
    <div className="form-btn-group">
      <button onClick={handleAdd} type="button" className="add-item">
        ADD
      </button>
      <button onClick={handleCancel} type="button" className="cancel-item">
        Cancel
      </button>
    </div>
  );
}

export default FormButtons;
