import React from 'react';

import FormButtonPrimary from './FormButtonPrimary';
import FormButtonCancel from './FormButtonCancel';

function FormButtons() {
  return (
    <div className="form-btn-group">
      <FormButtonPrimary text="Add" handleAdd={() => console.log('add')} />
      <FormButtonCancel handleCancel={() => console.log('cancel')} />
    </div>
  );
}

export default FormButtons;
