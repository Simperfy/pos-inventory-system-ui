import React from 'react';

import FormStaticText from './FormStaticText';
import FormInputText from './FormInputText';
import FormSelect from './FormSelect';
import FormButtons from './FormButtons';
import FormDetailText from './FormDetailText';

import './FormGroup.css';

function FormGroup() {
  const suppliers = [
    { id: 1, name: 'supplier 1', value: 'supplier 1' },
    { id: 2, name: 'supplier 2', value: 'supplier 2' },
    { id: 3, name: 'supplier 3', value: 'supplier 3' },
  ];

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="d-flex flex-column main-form">
          <FormStaticText
            text={'Item 1'}
            textBelow={'5fe2ff51ab328745dc231241'}
          />
          <FormInputText label={'Qty'} placeHolder={'1 pcs'} />
          <FormSelect label={'Supplier'} options={suppliers} />
          <FormButtons handleAdd={() => console.log('Add')} handleCancel={() => console.log('Cancel')} />
        </div>
      </div>

      <div className="col-md-6">
        <FormDetailText price={"100.00"} discount={"10.00"} subTotal={"300.00"} discountTotal={"30.00"} total={"270.00"}/>
      </div>
    </div>
  );
}

export default FormGroup;
