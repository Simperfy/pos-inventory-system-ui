import React from 'react';

import {Form} from '../index';

import {InventoryContext} from '../../context/InventoryContext';

import './FormGroup.css';
import {connect} from 'react-redux';
import {updateQuantity} from '../../actions/quantityActions';

class FormGroupInventorySack extends React.Component {
  static contextType = InventoryContext;

  render() {
    const {
      // suppliers,
      itemText,
      itemBarcode,
      supplierId,
      sacks,
      // quantity,
      kilo,
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
              value={kilo}
              onChange={this.context.handleSackSelectChange}
              label={'Sack'}
              options={sacks.map((s) => ({id: s.sackId, value: s.sackValue, name: s.sackLabel}))}
            />
            <Form.FormSelect
              value={supplierId}
              onChange={this.context.handleSupplierSelectChange}
              label={'Supplier'}
              options={this.props.suppliers}
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
  suppliers: state.suppliers,
}), {updateQuantity},
)(FormGroupInventorySack);
