import React from 'react';

import c from '../index';

import { InventoryContext } from '../../context/InventoryContext';

import './FormGroup.css';

class FormGroup extends React.Component {
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
            <c.Form.FormStaticText text={itemText} textBelow={itemBarcode} />
            <c.Form.FormInput
              formType="number"
              onChange={this.context.handleQuantityInputChange}
              label={'Qty'}
              placeHolder={'1 pcs'}
              min="1"
            />
            <c.Form.FormSelect
              value={supplierId}
              onChange={this.context.handleSupplierSelectChange}
              label={'Supplier'}
              options={suppliers.map((s) => ({id: s.id, value: s.id, name: s.supplierName}))}
            />
            <div className="form-btn-group">
              <c.Form.FormButton
                color="blue"
                solid
                text="Add"
                handleClick={this.context.addPendingItems}
              />
              <c.Form.FormButton
                color="red"
                text="Cancel"
                handleClick={this.context.closeForm}
              />
            </div>
          </div>
        </div>

        {this.props.formDetail && (
          <div className="col-md-6">
            <c.Form.FormDetailText
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
