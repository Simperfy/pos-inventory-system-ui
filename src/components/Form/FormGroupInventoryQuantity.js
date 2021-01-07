import React from 'react';

import {Form} from '../index';

import {InventoryContext} from '../../context/InventoryContext';

import './FormGroup.css';
import {connect} from 'react-redux';
import {updateQuantityOnInput} from '../../actions/quantityActions';
import {updateSuppliersSelectedId, updateSuppliersSelectedIdOnInput} from '../../actions/suppliersActions';

class FormGroupInventoryQuantity extends React.Component {
  static contextType = InventoryContext;

  componentDidMount() {
    this.props.updateSuppliersSelectedId(this.props.suppliers[0].id);
  }

  render() {
    return (
      <div className="row form-group-container" ref={this.context.state.formGroupRef}>
        <div className="col-md-6">
          <div className="d-flex flex-column main-form">
            <Form.FormStaticText text={this.props.itemText} textBelow={this.props.itemBarcode} />
            <Form.FormInput
              formType="number"
              onChange={this.props.updateQuantityOnInput}
              label={'Qty'}
              placeHolder={'1 pcs'}
              value={this.props.quantity}
              min="1"
              hideZero
            />
            <Form.FormSelect
              value={this.props.supplierSelectedId}
              onChange={this.props.updateSuppliersSelectedIdOnInput}
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
  suppliers: state.suppliersStore.suppliers,
  itemText: state.item.text,
  itemBarcode: state.item.barcode,
  supplierSelectedId: state.suppliersStore.supplierSelectedId,
}), {updateQuantityOnInput, updateSuppliersSelectedIdOnInput, updateSuppliersSelectedId},
)(FormGroupInventoryQuantity);
