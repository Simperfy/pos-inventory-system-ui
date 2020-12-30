import React from 'react';

import FormStaticText from './FormStaticText';
import FormInputText from './FormInputText';
import FormSelect from './FormSelect';
import FormButtons from './FormButtons';
import FormDetailText from './FormDetailText';

import './FormGroup.css';

function FormGroup() {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="d-flex flex-column main-form">
          <FormStaticText />
          <FormInputText />
          <FormSelect />
          <FormButtons />
        </div>
      </div>

      <div className="col-md-6">
        <FormDetailText />
      </div>
    </div>
  );
}

export default FormGroup;
