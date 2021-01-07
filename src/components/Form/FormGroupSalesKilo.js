import React from 'react';

import {Form} from '../index';

import {SalesContext} from '../../context/SalesContext';

import './FormGroup.css';
import enumKiloType from '../../enums/enumKiloType';
import {connect} from 'react-redux';
import {updateDiscount} from '../../actions/discountActions';
import {updateQuantity} from '../../actions/quantityActions';
import {updateSackSelectedIdAndKilo} from '../../actions/sacksActions';
import {updateKilo} from '../../actions/kiloActions';

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
      // quantity,
      // sacks,
      // kilo,
      kiloType,
      kiloTypes,
    } = this.context.state.mainForm;

    const {
      formDetail,
      // formDetailShow,
    } = this.context.state;

    const discount = this.props.discount;
    const quantity = this.props.quantity;
    const subTotal = quantity * formDetail.price;
    const discountTotal = quantity * (isNaN(discount) ? 0 : discount);
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
              options={kiloTypes.map((s) => ({id: s.value, name: s.name}))}
            />
            { kiloType === enumKiloType.sack &&
            <>
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
                value={this.props.selectedSackId}
                onChange={(e) => this.props.updateSackSelectedIdAndKilo(e.target.value)}
                label={'Sack'}
                options={this.props.sacks}
              />
            </>}

            { kiloType === enumKiloType.kilo &&
            <>
              <Form.FormInput
                formType="number"
                onChange={this.props.updateKilo}
                label={'Kilo'}
                placeHolder={'1.0'}
                value={this.props.kilo}
                min="1"
                hideZero
              />
            </>}
            <Form.FormInput
              formType="number"
              onChange={this.props.updateDiscount}
              label={'Discount'}
              placeHolder={'0.00'}
              value={this.props.discount}
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

        {this.props.quantity > 0 && (
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

export default connect((state) => ({
  kilo: state.kilo,
  quantity: state.quantity,
  discount: state.discount,
  sacks: state.sacksStore.sacks,
  selectedSackId: state.sacksStore.selectedSackId,
}), {updateDiscount, updateQuantity, updateSackSelectedIdAndKilo, updateKilo})(FormGroupSalesKilo);
