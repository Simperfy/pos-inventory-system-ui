import React from 'react';

import {Modal} from '../components';
import MainLayout from '../layout/MainLayout';
import MainFormLayoutSales from '../layout/MainFormLayoutSales';
import {withRouter} from 'react-router-dom';
import {SalesContext} from '../context/SalesContext';
import {AppContext} from '../context/AppContext';
import {AbstractPage} from './AbstractPage';
import PendingItemsLayout from '../layout/PendingItemsLayout';
import pendingItemTypes from '../enums/enumPendingItemTypes';
// import enumKiloType from '../enums/enumKiloType';
// import enumFormTypes from '../enums/enumFormTypes';
import {connect} from 'react-redux';
import {updateSearchResults} from '../actions/searchResultsActions';
import {updateSuppliers} from '../actions/suppliersActions';
import {updateSacks, updateSackSelectedId} from '../actions/sacksActions';
import {addPendingSalesItem} from '../actions/pendingItemsActions';
import {updatePrice, updatePriceBySackId} from '../actions/priceActions';
import {resetQuantity, updateQuantity} from '../actions/quantityActions';
import {updateItemBarcode, updateItemPrice, updateItemText} from '../actions/itemActions';
import {updateKiloBySackId} from '../actions/kiloActions';

class SalesPage extends AbstractPage {
  static contextType = AppContext;

  addPendingItems = () => {
    // if (!this.isValidFormSales()) return;
    if (!this.removeDuplicate()) return;

    const item = {
      name: this.props.itemText,
      barcode: this.props.itemBarcode,
      quantity: this.props.quantity,
      kilo: this.props.kilo,
      discount: this.props.discount,
      price: this.props.price,
    };

    this.props.addPendingSalesItem(item); // redux

    this.closeForm();
    this.resetForm();
  };

  handleSearchBarItemClick = (newFormValue) => {
    this.addOpacityBlur();

    this.closeSearchResults();
    this.resetForm();

    this.props.updateItemText(newFormValue.itemText);
    this.props.updateItemBarcode(newFormValue.itemBarcode);
    this.props.updateItemPrice(newFormValue.price); // retain item kilo/qty price
    this.props.updateSuppliers(newFormValue.suppliers); // redux
    this.props.updateSacks(newFormValue.sacks); // redux
    this.props.updatePrice(newFormValue.price); // redux

    this.setState((prevState, props) => {
      // const quantity = this.state.formType === enumFormTypes.salesPerKilo ? 1 : prevState.mainForm.quantity;

      return {
        // @TODO FORM TYPE MUST BE INCLUDED IN REDUX BEFORE REMOVING THIS
        mainForm: {
          ...prevState.mainForm,
          ...newFormValue,
          // quantity: quantity,
          // kilo: newFormValue.sacks[0]?.sackValue || 0,
        },
        /* formDetail: {
          price: newFormValue.price,
          discount: prevState.formDetail.discount,
        },*/
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
                <PendingItemsLayout // pendingItems={this.state.pendingItems}
                  // removeAllPendingItems={this.removeAllPendingItems}
                  // removePendingItem={this.removePendingItem}
                  setState={this.setState.bind(this)}
                  pendingItemTypes={pendingItemTypes.sales}
                />
              </div>
            </div>
          </div>
        </MainLayout>
        {this.state.isConfirming && <Modal.ModalConfirm
          handleSubmitConfirm={this.context.handleSubmitConfirm}
          setState={this.context.setState.bind(this)}
          confirmItems={this.state.pendingItems.map((pi) => ({id: pi.id, leftText: `${pi.quantity} x ${pi.name} ${pi.kilo > 0 ? `(${pi.kilo} kg)` : ''}`, rightText: pi.supplierName}))}
        />}
        {this.state.isLoading && <Modal.ModalLoading />}
        {this.state.isSuccess && <Modal.ModalSuccess handleClick={this.handleModalSuccessClick} />}
        {this.state.isFailed && <Modal.ModalFailed handleClick={this.handleModalFailedClick} handleClose={this.handleModalFailedClose}/>}
      </SalesContext.Provider>
    );
  }
}

export default withRouter(connect((state) => ({
  pendingItems: state.pending.pendingItems,
  quantity: state.quantity,
  sacks: state.sacksStore.sacks,
  itemText: state.item.text,
  itemBarcode: state.item.barcode,
  kilo: state.kilo,
  discount: state.discount,
  price: state.price,
}), {
  addPendingSalesItem,
  updateSearchResults,
  updateSuppliers,
  updateSacks,
  updateSackSelectedId,
  updatePrice,
  resetQuantity,
  updateQuantity,
  updateItemText,
  updateItemBarcode,
  updateItemPrice,
  updateKiloBySackId,
  updatePriceBySackId,
},
)(SalesPage));
