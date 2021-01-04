import React from 'react';

import {Form} from '../index';

import {SalesContext} from '../../context/SalesContext';

import './FormGroup.css';

class FormGroupSalesQuantity extends React.Component {
  static contextType = SalesContext;

  render() {
    const {
      // suppliers,
      itemText,
      itemBarcode,
      // supplierId,
      quantity,
      // kilo,
    } = this.context.state.mainForm;

    const {
      formDetail,
      // formDetailShow,
    } = this.context.state;

    const subTotal = quantity * formDetail.price;
    const discountTotal = quantity * formDetail.discount;
    const total = subTotal - discountTotal;

    return (
      <div className="row form-group-container" ref={this.context.state.formGroupRef}>
        <div className="col-md-6">
          <div className="d-flex flex-column main-form">
            <Form.FormStaticText text={itemText} textBelow={itemBarcode} />
            <Form.FormInput
              formType="number"
              onChange={this.context.handleQuantityInputChange}
              label={'Qty'}
              placeHolder={'1 pcs'}
              value={quantity}
              min="1"
              hideZero
            />
            <Form.FormInput
              formType="number"
              onChange={this.context.handleDiscountInputChange}
              label={'Discount'}
              placeHolder={'0.00'}
              value={formDetail.discount}
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
            <Form.FormDetailText
              price={formDetail.price?.toFixed(2)}
              discount={formDetail.discount?.toFixed(2)}
              subTotal={subTotal?.toFixed(2)}
              discountTotal={discountTotal?.toFixed(2)}
              total={total?.toFixed(2)}
            />
          </div>
        )}
      </div>
    );
  }
}
export default FormGroupSalesQuantity;
