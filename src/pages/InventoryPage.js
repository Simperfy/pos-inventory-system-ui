import React from 'react';

import {Modal} from '../components';
import MainLayout from '../containers/MainLayout';
import MainFormLayoutInventory from '../containers/MainFormLayoutInventory';
import PendingItemsLayout from '../containers/PendingItemsLayout';
import {withRouter} from 'react-router-dom';
import {InventoryContext} from '../context/InventoryContext';
import {AppContext} from '../context/AppContext';
import {AbstractPage} from './AbstractPage';
import pendingItemTypes from '../enums/enumPendingItemTypes';
import {connect} from 'react-redux';
import {addPendingInventoryItem, removeAllPendingItems} from '../actions/pendingItemsActions';
import {updateSearchResults} from '../actions/searchResultsActions';
import {updateSuppliers} from '../actions/suppliersActions';
import {updateSacksAndKilo, updateSackSelectedId, updateSackSelectedIdAndKilo} from '../actions/sacksActions';
import {updateItemBarcode, updateItemRemaining, updateItemText} from '../actions/itemActions';
import {enumSubmitConfirmTypes} from '../enums/enumSubmitConfirmTypes';
import formTypes from '../enums/enumFormTypes';
import {resetQuantity} from '../actions/quantityActions';
// import {updateKiloOnInput} from '../actions/kiloActions';

class InventoryPage extends AbstractPage {
  static contextType = AppContext;

  addPendingItems = () => {
    const item = {
      name: this.props.itemText,
      barcode: this.props.itemBarcode,
      quantity: this.props.quantity,
      kilo: this.props.kilo,
    };

    if (!this.isValidFormInventory(item)) return;
    if (!this.removeDuplicate()) return;

    this.props.addPendingInventoryItem(item);

    this.closeForm();
    this.resetForm();
  };

  handleSearchBarItemClick = (res) => {
    const itemText = res.name;
    const itemBarcode = res.id;
    const suppliers = res.suppliers;
    const sacks = res.sacks;
    const remaining = res.remaining;
    const formType = res.kiloAble ? formTypes.inventoryPerSack : formTypes.inventoryPerQuantity;

    this.addOpacityBlur();

    this.closeSearchResults();
    this.resetForm();

    this.props.resetQuantity();
    this.props.updateItemText(itemText);
    this.props.updateItemBarcode(itemBarcode);
    this.props.updateItemRemaining(remaining);
    this.props.updateSuppliers(suppliers);
    this.props.updateSacksAndKilo(sacks);

    this.showForm(formType);
  };

  componentDidMount() {
    this.props.removeAllPendingItems(false);
  }

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
          handleSubmitConfirm={() => this.handleSubmitConfirm(enumSubmitConfirmTypes.INVENTORY_SUBMIT)}
          setState={this.context.setState.bind(this)}
          confirmItems={this.props.pendingItems.map((pi) => ({
            id: pi.id,
            leftText: `${pi.quantity} x ${pi.name} ${pi.kilo > 0 ? `(${pi.kilo} kg)` : ''}`,
            rightText: pi.supplierName,
          }),
          )}
        />}
        {this.state.isLoading && <Modal.ModalLoading />}
        {this.state.isSuccess && <Modal.ModalSuccess handleClick={this.handleModalSuccessClick} />}
        {this.state.isFailed && <Modal.ModalFailed
          handleClick={() => this.handleModalFailedClick(enumSubmitConfirmTypes.INVENTORY_SUBMIT)}
          handleClose={this.handleModalFailedClose}/>}
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
  searchResults: state.searchResults,
}), {
  addPendingInventoryItem,
  updateSearchResults,
  updateSuppliers,
  updateSacksAndKilo,
  updateSackSelectedId,
  updateSackSelectedIdAndKilo,
  updateItemText,
  updateItemBarcode,
  removeAllPendingItems,
  updateItemRemaining,
  resetQuantity,
},
)(InventoryPage));
