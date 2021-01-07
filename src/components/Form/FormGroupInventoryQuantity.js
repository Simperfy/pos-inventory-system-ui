import React from 'react';

import {Form} from '../index';

import {InventoryContext} from '../../context/InventoryContext';

import './FormGroup.css';
import {connect} from 'react-redux';
import {updateQuantity} from '../../actions/quantityActions';

class FormGroupInventoryQuantity extends React.Component {
  static contextType = InventoryContext;

  render() {
    const {
      suppliers,
      itemText,
      itemBarcode,
      supplierId,
      // quantity,
      // kilo,
    } = this.context.state.mainForm;

    return (
      <div className="row form-group-container" ref={this.context.state.formGroupRef}>
        <div className="col-md-6">
          <div className="d-flex flex-column main-form">
            <Form.FormStaticText text={itemText} textBelow={itemBarcode} />
            <Form.FormInput
              formType="number"
              onChange={this.props.updateQuantity}
              label={'Qty'}
              placeHolder={'1 pcs'}
              value={this.props.quantity}
              min="1"
              hideZero
            />
            <Form.FormSelect
              value={supplierId}
              onChange={this.context.handleSupplierSelectChange}
              label={'Supplier'}
              options={suppliers.map((s) => ({id: s.id, value: s.id, name: s.supplierName}))}
            />
            <div className="form-btn-group">
              <Form.FormButton
                color="blue"
                solid
                text="Add"
                handleClick={this.context.addPendingItems}
              />
              <Form.FormButton
                color="red"
                text="Cancel"
                handleClick={this.context.closeForm}
              />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default connect((state) => ({
  quantity: state.quantity,
}), {updateQuantity},
)(FormGroupInventoryQuantity);
