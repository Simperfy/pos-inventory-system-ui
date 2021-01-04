import React from 'react';

import MainLayout from '../layout/MainLayout';
import MainFormLayoutSales from '../layout/MainFormLayoutSales';
import { withRouter } from 'react-router-dom'
import { SalesContext } from '../context/SalesContext';
import { AppContext } from '../context/AppContext';
import {AbstractPage} from "./AbstractPage";
import PendingItemsLayout from "../layout/PendingItemsLayout";
import pendingItemTypes from "../util/pendingItemTypes";

class SalesPage extends AbstractPage {
  static contextType = AppContext;

  addPendingItems = () => {
    if (!this.isValidForm()) return;
    if(!this.removeDuplicate()) return;

    const {
      itemText,
      itemBarcode,
      // supplierName,
      // supplierId,
      quantity,
      kilo
    } = this.state.mainForm;

    const {
      price,
      discount
    } = this.state.formDetail;

    this.setState((prevState, props) => ({
      pendingItems: [
        {
          id: itemBarcode + this.pendingItemsCounter++,
          name: itemText,
          // supplierName: supplierName,
          // supplierId: supplierId,
          quantity: quantity,
          barcode: itemBarcode,
          kilo: kilo,
          discount: discount,
          price: price
        },
        ...prevState.pendingItems,
      ],
    }));
    this.closeForm();
    this.resetForm();
  };

  handleSearchBarItemClick = (newFormValue) => {
    this.addOpacityBlur()

    this.closeSearchResults();
    this.resetForm();

    this.setState((prevState, props) => {
      return {
        mainForm: {
          ...prevState.mainForm,
          ...newFormValue,
          // supplierName: newFormValue.suppliers[0].supplierName,
          // supplierId: newFormValue.suppliers[0].id,
          kilo: newFormValue.sacks[0]?.sackValue || 0
        },
      };
    });

    this.showForm(newFormValue.formType);
  };

  render() {
    return (
      <SalesContext.Provider
        value={this.providerFunctions()}
      >
        <MainLayout type="sales">
          <div className="container-fluid">
            <div className="row h-100 pb-4">
              <div className="col-md-8">
                <MainFormLayoutSales />
              </div>
              <div className="col-md-4">
                <PendingItemsLayout pendingItems={this.state.pendingItems}
                                    removeAllPendingItems={this.removeAllPendingItems}
                                    removePendingItem={this.removePendingItem}
                                    setState={this.setState.bind(this)}
                                    pendingItemTypes={pendingItemTypes.sales}
                />
              </div>
            </div>
          </div>
        </MainLayout>
        {/*{this.state.isConfirming && <Modal.ModalConfirm
          confirmItems={this.state.pendingItems.map((pi) => ({id: pi.id, leftText: `${pi.quantity} x ${pi.name} ${pi.kilo > 0 ? `(${pi.kilo} kg)` : ''}`, rightText: pi.supplierName}))}
        />}
        {this.state.isLoading && <Modal.ModalLoading />}
        {this.state.isSuccess && <Modal.ModalSuccess handleClick={this.handleModalSuccessClick} />}
        {this.state.isFailed && <Modal.ModalFailed handleClick={this.handleModalFailedClick} handleClose={this.handleModalFailedClose}/>}*/}
      </SalesContext.Provider>
    );
  }
}

export default withRouter(SalesPage);
