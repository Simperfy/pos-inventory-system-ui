import React from 'react';

import FormStaticText from './FormStaticText';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormButton from './FormButton';
import FormDetailText from './FormDetailText';

import { InventoryContext } from '../context/InventoryContext';

import './FormGroup.css';

class FormGroup extends React.Component {
  static contextType = InventoryContext;

  handleFormInput = (e) => {
    const quantity = parseInt(e.target.value);
    this.context.setState((prevState, props) => ({
      mainForm: { ...prevState.mainForm, quantity: quantity },
    }));
  };

  handleSelectChange = (e) => {
    this.context.setState((prevState, props) => ({
      mainForm: { ...prevState.mainForm, supplierValue: e.target.value },
    }));
  };

  render() {
    const {
      suppliers,
      itemText,
      itemBarcode,
      supplierValue,
      quantity,
      kilo,
    } = this.context.state.mainForm;

    return (
      <div className="row form-group-container" ref={this.context.state.formGroupRef}>
        <div className="col-md-6">
          <div className="d-flex flex-column main-form">
            <FormStaticText text={itemText} textBelow={itemBarcode} />
            <FormInput
              formType="number"
              onChange={this.handleFormInput}
              label={'Qty'}
              placeHolder={'1 pcs'}
              min="1"
            />
            <FormSelect
              value={supplierValue}
              onChange={this.handleSelectChange}
              label={'Supplier'}
              options={suppliers.map((s) => ({id: s.id, value: s.id, name: s.supplierName}))}
            />
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
