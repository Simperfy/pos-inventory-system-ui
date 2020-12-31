import React from 'react';

import FormStaticText from './FormStaticText';
import FormInputText from './FormInputText';
import FormSelect from './FormSelect';
import FormButton from './FormButton';
import FormDetailText from './FormDetailText';

import { InventoryContext } from '../context/InventoryContext';

import './FormGroup.css';

class FormGroup extends React.Component {
  static contextType = InventoryContext;

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <div className="d-flex flex-column main-form">
            <FormStaticText
              text={'Item 1'}
              textBelow={'5fe2ff51ab328745dc231241'}
            />
            <FormInputText label={'Qty'} placeHolder={'1 pcs'} />
            <FormSelect label={'Supplier'} options={this.context.state.suppliers} />
            <div className="form-btn-group">
              <FormButton
                color="blue"
                solid
                text="Add"
                handleClick={this.context.addPendingItems}
              />
              <FormButton
                color="red"
                text="Cancel"
                handleClick={this.context.closeForm}
              />
            </div>
          </div>
        </div>

        {this.props.formDetail && (
          <div className="col-md-6">
            <FormDetailText
              price={'100.00'} // formDetail.price
              discount={'10.00'} // formDetail.discount
              subTotal={'300.00'} // formDetail.subTotal
              discountTotal={'30.00'} // formDetail.discountTotal
              total={'270.00'} // formDetail.total
            />
          </div>
        )}
      </div>
    );
  }
}
export default FormGroup;
