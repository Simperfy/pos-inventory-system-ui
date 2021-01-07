import React from 'react';

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
import {updatePrice} from '../actions/priceActions';

class SalesPage extends AbstractPage {
  static contextType = AppContext;

  addPendingItems = () => {
    // if (!this.isValidFormSales()) return;
    if (!this.removeDuplicate()) return;

    const {
      itemText,
      itemBarcode,
      // supplierName,
      // supplierId,
      // quantity,
      kilo,
    } = this.state.mainForm;

    const {
      price,
      discount,
    } = this.state.formDetail;

    // @TODO: check itemType
    // @TODO: check whether sack or kilo
    const item = {
      id: itemBarcode + this.pendingItemsCounter++,
      name: itemText,
      quantity: this.props.quantity,
      barcode: itemBarcode,
      kilo: kilo,
      discount: discount,
      price: price,
    };

    this.props.addPendingSalesItem(item); // redux

    this.closeForm();
    this.resetForm();
  };

  handleSearchBarItemClick = (newFormValue) => {
    this.addOpacityBlur();

    this.closeSearchResults();
    this.resetForm();

    this.props.updateSuppliers(newFormValue.suppliers); // redux
    this.props.updateSacks(newFormValue.sacks); // redux
    this.props.updatePrice(newFormValue.price); // redux

    this.setState((prevState, props) => {
      // const quantity = this.state.formType === enumFormTypes.salesPerKilo ? 1 : prevState.mainForm.quantity;

      return {
        mainForm: {
          ...prevState.mainForm,
          ...newFormValue,
          // quantity: quantity,
          kilo: newFormValue.sacks[0]?.sackValue || 0,
        },
        formDetail: {
          price: newFormValue.price,
          discount: prevState.formDetail.discount,
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
        {/* {this.state.isConfirming && <Modal.ModalConfirm
          confirmItems={this.state.pendingItems.map((pi) => ({id: pi.id, leftText: `${pi.quantity} x ${pi.name} ${pi.kilo > 0 ? `(${pi.kilo} kg)` : ''}`, rightText: pi.supplierName}))}
        />}
        {this.state.isLoading && <Modal.ModalLoading />}
        {this.state.isSuccess && <Modal.ModalSuccess handleClick={this.handleModalSuccessClick} />}
        {this.state.isFailed && <Modal.ModalFailed handleClick={this.handleModalFailedClick} handleClose={this.handleModalFailedClose}/>}*/}
      </SalesContext.Provider>
    );
  }
}

export default withRouter(connect((state) => ({
  pendingItems: state.pending.pendingItems,
  quantity: state.quantity,
  sacks: state.sacksStore.sacks,
}), {addPendingSalesItem, updateSearchResults, updateSuppliers, updateSacks, updateSackSelectedId, updatePrice},
)(SalesPage));
