import React from 'react';

import {Form} from '../index';

import {SalesContext} from '../../context/SalesContext';

import './FormGroup.css';
import enumKiloType from '../../enums/enumKiloType';

class FormGroupSalesKilo extends React.Component {
  static contextType = SalesContext;

  componentDidMount() {
    this.context.setState((prevState, props) => ({mainForm: {...prevState.mainForm, kilo: 0}}) );
  }

  render() {
    const {
      // suppliers,
      itemText,
      itemBarcode,
      // supplierId,
      quantity,
      sacks,
      kilo,
      kiloType,
      kiloTypes,
    } = this.context.state.mainForm;

    const {
      formDetail,
      // formDetailShow,
    } = this.context.state;

    const subTotal = quantity * formDetail.price;
    const discountTotal = quantity * (isNaN(formDetail.discount) ? 0 : formDetail.discount);
    const total = subTotal - discountTotal;

    return (
      <div className="row form-group-container" ref={this.context.state.formGroupRef}>
        <div className="col-md-6">
          <div className="d-flex flex-column main-form">
            <Form.FormStaticText text={itemText} textBelow={itemBarcode} />
            <Form.FormSelect
              value={kiloType}
              onChange={this.context.handleItemTypeSelectChange}
              label={'Type'}
              options={kiloTypes.map((s) => ({id: s.id, value: s.value, name: s.name}))}
            />
            { kiloType === enumKiloType.sack &&
            <>
              <Form.FormInput
                formType="number"
                onChange={this.context.handleQuantityInputChange}
                label={'Qty'}
                placeHolder={'1 pcs'}
                value={quantity}
                min="1"
                hideZero
              />
              <Form.FormSelect
                value={kilo}
                onChange={this.context.handleSackSelectChange}
                label={'Sack'}
                options={sacks.map((s) => ({id: s.sackId, value: s.sackValue, name: s.sackLabel}))}
              />
            </>}

            { kiloType === enumKiloType.kilo &&
            <>
              <Form.FormInput
                formType="number"
                onChange={this.context.handleKiloInputChange}
                label={'Kilo'}
                placeHolder={'1.0'}
                value={kilo}
                min="1"
                hideZero
              />
            </>}
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
export default FormGroupSalesKilo;
