import React from 'react';

import {Modal} from '../components';
import MainLayout from '../layout/MainLayout';
import MainFormLayoutInventory from '../layout/MainFormLayoutInventory';
import PendingItemsLayout from '../layout/PendingItemsLayout';
import { withRouter } from 'react-router-dom'
import { InventoryContext } from '../context/InventoryContext';
import { AppContext } from '../context/AppContext';
import {AbstractPage} from "./AbstractPage";
import pendingItemTypes from "../util/pendingItemTypes";

class InventoryPage extends AbstractPage {
  static contextType = AppContext;

  addPendingItems = () => {
    if (!this.isValidForm()) return;
    if(!this.removeDuplicate()) return;

    const {
      itemText,
      itemBarcode,
      supplierName,
      supplierId,
      quantity,
      kilo
    } = this.state.mainForm;

    this.setState((prevState, props) => ({
      pendingItems: [
        {
          id: itemBarcode + this.pendingItemsCounter++,
          name: itemText,
          supplierName: supplierName,
          supplierId: supplierId,
          quantity: quantity,
          barcode: itemBarcode,
          kilo: kilo
        },
        ...prevState.pendingItems,
      ],
    }));
    this.closeForm();
    this.resetForm();
  };

  render() {
    return (
      <InventoryContext.Provider
        value={this.providerFunctions()}
      >
        <MainLayout type="inventory">
          <div className="container-fluid">
            <div className="row h-100 pb-4">
              <div className="col-md-8">
                <MainFormLayoutInventory />
              </div>
              <div className="col-md-4">
                <PendingItemsLayout pendingItems={this.state.pendingItems}
                                    removeAllPendingItems={this.removeAllPendingItems}
                                    removePendingItem={this.removePendingItem}
                                    setState={this.setState.bind(this)}
                                    pendingItemTypes={pendingItemTypes.inventory}
                />
              </div>
            </div>
          </div>
        </MainLayout>
        {this.state.isConfirming && <Modal.ModalConfirm
          confirmItems={this.state.pendingItems.map((pi) => ({id: pi.id, leftText: `${pi.quantity} x ${pi.name} ${pi.kilo > 0 ? `(${pi.kilo} kg)` : ''}`, rightText: pi.supplierName}))}
        />}
        {this.state.isLoading && <Modal.ModalLoading />}
        {this.state.isSuccess && <Modal.ModalSuccess handleClick={this.handleModalSuccessClick} />}
        {this.state.isFailed && <Modal.ModalFailed handleClick={this.handleModalFailedClick} handleClose={this.handleModalFailedClose}/>}
      </InventoryContext.Provider>
    );
  }
}

export default withRouter(InventoryPage);
