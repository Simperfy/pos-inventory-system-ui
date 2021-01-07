import React from 'react';

import {Modal} from '../components';
import MainLayout from '../layout/MainLayout';
import MainFormLayoutInventory from '../layout/MainFormLayoutInventory';
import PendingItemsLayout from '../layout/PendingItemsLayout';
import {withRouter} from 'react-router-dom';
import {InventoryContext} from '../context/InventoryContext';
import {AppContext} from '../context/AppContext';
import {AbstractPage} from './AbstractPage';
import pendingItemTypes from '../enums/enumPendingItemTypes';
import {connect} from 'react-redux';
import {addPendingItem} from '../actions/pendingItemsActions';
import {updateSearchResults} from '../actions/searchResultsActions';
import {updateSuppliers} from '../actions/suppliersActions';
import {updateSacksAndKilo, updateSackSelectedId, updateSackSelectedIdAndKilo} from '../actions/sacksActions';
import {updateItemBarcode, updateItemText} from '../actions/itemActions';
// import {updateKiloOnInput} from '../actions/kiloActions';

class InventoryPage extends AbstractPage {
  static contextType = AppContext;

  addPendingItems = () => {
    // if (!this.isValidFormInventory()) return;
    if (!this.removeDuplicate()) return;

    const {
      // itemText,
      // itemBarcode,
      supplierName,
      supplierId,
      // quantity,
      // kilo,
    } = this.state.mainForm;

    const item = {
      name: this.props.itemText,
      barcode: this.props.itemBarcode,
      supplierName: supplierName,
      supplierId: supplierId,
      quantity: this.props.quantity,
      kilo: this.props.kilo,
    };

    this.props.addPendingItem(item); // redux

    this.closeForm();
    this.resetForm();
  };

  handleSearchBarItemClick = (newFormValue) => {
    this.addOpacityBlur();

    this.closeSearchResults();
    this.resetForm();

    this.props.updateItemText(newFormValue.itemText);
    this.props.updateItemBarcode(newFormValue.itemBarcode);
    this.props.updateSuppliers(newFormValue.suppliers); // redux
    this.props.updateSacksAndKilo(newFormValue.sacks); // redux

    this.showForm(newFormValue.formType);
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
                <PendingItemsLayout
                  setState={this.setState.bind(this)}
                  pendingItemTypes={pendingItemTypes.inventory}
                />
              </div>
            </div>
          </div>
        </MainLayout>
        {this.state.isConfirming && <Modal.ModalConfirm
          handleSubmitConfirm={this.context.handleSubmitConfirm}
          setState={this.context.setState.bind(this)}
          confirmItems={this.props.pendingItems.map((pi) => ({id: pi.id, leftText: `${pi.quantity} x ${pi.name} ${pi.kilo > 0 ? `(${pi.kilo} kg)` : ''}`, rightText: pi.supplierName}))}
        />}
        {this.state.isLoading && <Modal.ModalLoading />}
        {this.state.isSuccess && <Modal.ModalSuccess handleClick={this.handleModalSuccessClick} />}
        {this.state.isFailed && <Modal.ModalFailed handleClick={this.handleModalFailedClick} handleClose={this.handleModalFailedClose}/>}
      </InventoryContext.Provider>
    );
  }
}

export default withRouter(connect((state) => ({
  pendingItems: state.pending.pendingItems,
  quantity: state.quantity,
  sacks: state.sacksStore.sacks,
  kilo: state.kilo,
  itemText: state.item.text,
  itemBarcode: state.item.barcode,
}), {
  addPendingItem,
  updateSearchResults,
  updateSuppliers,
  updateSacksAndKilo,
  updateSackSelectedId,
  updateSackSelectedIdAndKilo,
  updateItemText,
  updateItemBarcode,
},
)(InventoryPage));
