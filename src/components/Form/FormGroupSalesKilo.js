import React from 'react';

import {Form} from '../index';

import {SalesContext} from '../../context/SalesContext';

import './FormGroup.css';
import enumKiloType from '../../enums/enumKiloType';
import {connect} from 'react-redux';
import {updateDiscountOnInput} from '../../actions/discountActions';
import {updateQuantity, updateQuantityOnInput} from '../../actions/quantityActions';
import {updateSackSelectedIdAndKilo} from '../../actions/sacksActions';
import {updateKiloOnInput} from '../../actions/kiloActions';
// import {updatePrice} from '../../actions/priceActions';

class FormGroupSalesKilo extends React.Component {
  static contextType = SalesContext;

  componentDidMount() {
    this.props.updateQuantity(1);
  }

  render() {
    const {
      kiloType,
      kiloTypes,
    } = this.context.state.mainForm;

    return (
      <div className="row form-group-container" ref={this.context.state.formGroupRef}>
        <div className="col-md-6">
          <div className="d-flex flex-column main-form">
            <Form.FormStaticText text={this.props.itemText} textBelow={this.props.itemBarcode} />
            <Form.FormSelect
              value={kiloType}
              onChange={this.context.handleItemTypeSelectChange}
              label={'Type'}
              options={kiloTypes.map((s) => ({id: s.value, name: s.name}))}
            />
            { kiloType === enumKiloType.sack &&
            <>
              {/* QUANTITY */}
              <Form.FormInput
                formType="number"
                onChange={this.props.updateQuantityOnInput}
                label={'Qty'}
                placeHolder={'1 pcs'}
                value={this.props.quantity}
                min="1"
                hideZero
              />
              {/* SACK */}
              <Form.FormSelect
                value={this.props.selectedSackId}
                onChange={(e) => this.props.updateSackSelectedIdAndKilo(e.target.value)}
                label={'Sack'}
                options={this.props.sacks}
              />
            </>}

            { kiloType === enumKiloType.kilo &&
            <>
              {/* KILO */}
              <Form.FormInput
                formType="number"
                onChange={this.props.updateKiloOnInput}
                label={'Kilo'}
                placeHolder={'1.0'}
                value={this.props.kilo}
                min="1"
                hideZero
              />
            </>}
            <Form.FormInput
              formType="number"
              onChange={this.props.updateDiscountOnInput}
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
            <Form.FormDetailText />
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
  itemText: state.item.text,
  itemBarcode: state.item.barcode,
}), {
  updateQuantity,
  updateDiscountOnInput,
  updateQuantityOnInput,
  updateSackSelectedIdAndKilo,
  updateKiloOnInput,
})(FormGroupSalesKilo);
