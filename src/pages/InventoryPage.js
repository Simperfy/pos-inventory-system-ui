import React from 'react';

import {Modal} from '../components';
import MainLayout from '../layout/MainLayout';
import MainFormLayoutInventory from '../layout/MainFormLayoutInventory';
import PendingItemsLayout from '../layout/PendingItemsLayout';
// import Api from '../api/Api';
// import {ModelStocks} from "../api/models";
import { withRouter } from 'react-router-dom'
import { InventoryContext } from '../context/InventoryContext';
import { AppContext } from '../context/AppContext';
// import {getRoute} from "../routeConfig";
import {AbstractPage} from "./AbstractPage";

class InventoryPage extends AbstractPage {
  static contextType = AppContext;

  render() {
    return (
      <InventoryContext.Provider
        value={{
          state: this.state,
          setState: this.setState.bind(this),
          addPendingItems: this.addPendingItems,
          removePendingItem: this.removePendingItem,
          removeAllPendingItems: this.removeAllPendingItems,
          closeForm: this.closeForm,
          showForm: this.showForm,
          handleSearchBarChange: this.handleSearchBarChange,
          handleSearchBarItemClick: this.handleSearchBarItemClick,
          handleSearchBarFocus: this.handleSearchBarFocus,
          handleSearchBarBlur: this.handleSearchBarBlur,
          handleSubmitConfirm: this.handleSubmitConfirm,
          handleSupplierSelectChange: this.handleSupplierSelectChange,
          handleQuantityInputChange: this.handleQuantityInputChange,
          handleSackSelectChange: this.handleSackSelectChange,
        }}
      >
        <MainLayout type="inventory">
          <div className="container-fluid">
            <div className="row h-100 pb-4">
              <div className="col-md-8">
                <MainFormLayoutInventory />
              </div>
              <div className="col-md-4">
                <PendingItemsLayout />
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
