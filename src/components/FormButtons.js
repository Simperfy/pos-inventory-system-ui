import React from 'react';

import FormButton from './FormButton';

function FormButtons() {
  return (
    <div className="form-btn-group">
      <FormButton color="blue" solid text="Add" handleClick={() => console.log('add')} />
      <FormButton color="red" text="Cancel" handleClick={() => console.log('cancel')} />
    </div>
  );
}

export default FormButtons;
