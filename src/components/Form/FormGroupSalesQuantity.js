import React from 'react';

import {Form} from '../index';

import {SalesContext} from '../../context/SalesContext';

import './FormGroup.css';
import {connect} from 'react-redux';
import {updateQuantityOnInput} from '../../actions/quantityActions';
import {updateDiscountOnInput} from '../../actions/discountActions';

class FormGroupSalesQuantity extends React.Component {
  static contextType = SalesContext;

  render() {
    const quantity = this.props.quantity;
    const discount = this.props.discount;

    return (
      <div className="row form-group-container" ref={this.context.state.formGroupRef}>
        <div className="col-md-6">
          <div className="d-flex flex-column main-form">
            <Form.FormStaticText text={this.props.itemText} textBelow={this.props.itemBarcode} />
            <Form.FormInput
              formType="number"
              onChange={this.props.updateQuantity}
              label={'Qty'}
              placeHolder={'1 pcs'}
              value={quantity}
              min="1"
              hideZero
            />
            <Form.FormInput
              formType="number"
              onChange={this.props.updateDiscount}
              label={'Discount'}
              placeHolder={'0.00'}
              value={discount}
              min="0"
              hideZero
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

        {quantity > 0 && (
          <div className="col-md-6">
            <Form.FormDetailText />
          </div>
        )}
      </div>
    );
  }
}


export default connect((state) => ({
  quantity: state.quantity,
  discount: state.discount,
  itemText: state.item.text,
  itemBarcode: state.item.barcode,
}), {updateQuantity: updateQuantityOnInput, updateDiscount: updateDiscountOnInput},
)(FormGroupSalesQuantity);
