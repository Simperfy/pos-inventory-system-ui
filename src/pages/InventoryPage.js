import React from 'react';

import MainLayout from '../layout/MainLayout';
import MainFormLayout from '../layout/MainFormLayout';
import PendingItemsLayout from '../layout/PendingItemsLayout';
import ModalConfirm from '../components/ModalConfirm';
import ModalLoading from '../components/ModalLoading';
import Api from '../Api';
import { InventoryContext } from '../context/InventoryContext';
import { AppContext } from '../context/AppContext';

import './InventoryPage.css';

class Inventory extends React.Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.pendingItemsCounter = 0;

    this.state = {
      isLoading: false,
      pendingItems: [],
      mainForm: {
        itemText: '',
        itemBarcode: '',
        suppliers: [],
        supplierId: '',
        supplierValue: '',
        quantity: null,
        kilo: null,
      },
      showConfirmModal: false,
      showForm: false,
      searchResults: [],
      showSearchResults: false,
      formGroupRef: React.createRef()
    };

    for (let i = 0; i < 3; i++) {
      this.state.mainForm.suppliers.push({
        id: i,
        name: `Supplier ${i}`,
        value: `supplier ${i}`,
      });
    }
  }


  isValidForm() {
    const mainForm = this.state.mainForm;
    const nonEmptyFields = [
      'itemText',
      'itemBarcode',
      // 'suppliers',
      'supplierValue',
      'quantity',
      // 'kilo',
    ];

    for (const key of Object.keys(mainForm)) {
      if (nonEmptyFields.includes(key) && !mainForm[key]) {
        window.alert('There are invalid values');
        return false;
      }
    }

    return true;
  }

  checkDuplicate = (pi) => {
    const {
      itemBarcode,
      supplierValue,
    } = this.state.mainForm;

    return pi.barcode === itemBarcode && pi.supplier === supplierValue;
  }

  filterDuplicate = (pi) => {
    const {
      itemBarcode,
      supplierValue,
    } = this.state.mainForm;

    if (pi.barcode !== itemBarcode) return true;
    if (pi.barcode === itemBarcode && pi.supplier !== supplierValue) return true;
    return false;
  }

  removeDuplicate() {
    const isDuplicated = this.state.pendingItems.some(this.checkDuplicate);

    if (isDuplicated) {
      const isConfirmed = window.confirm("Item already added, do you want to replace the item?");

      if (isConfirmed) {
        this.setState((prevState, props) => {
          const newPendingItems = prevState.pendingItems.filter(this.filterDuplicate);
          return {pendingItems: newPendingItems}
        });

        return true; // if there's duplicate and already replace, update state
      }

      return false; // if there's duplicate and confirm = no, don't update state
    }

    return true; // if no duplicate update state
  }

  addPendingItems = () => {
    if (!this.isValidForm()) return;
    if(!this.removeDuplicate()) return;

    const {
      itemText,
      itemBarcode,
      supplierValue,
      supplierId,
      quantity,
      suppliers
    } = this.state.mainForm;

    this.setState((prevState, props) => ({
      pendingItems: [
        {
          id: itemBarcode + this.pendingItemsCounter++,
          name: itemText,
          supplierName: supplierValue,
          supplierId: supplierId,
          quantity: quantity,
          barcode: itemBarcode,
        },
        ...prevState.pendingItems,
      ],
    }));
    this.closeForm();
    this.resetForm();
  };

  resetForm = () =>
    this.setState((prevState, props) => ({
      mainForm: {
        ...prevState.mainForm,
        itemText: '',
        itemBarcode: '',
        // suppliers: [],
        supplierId: '',
        supplierValue: '',
        quantity: null,
        kilo: null,
      },
    }));

  removePendingItem = (id) => {
    this.setState((prevState, props) => ({
      pendingItems: prevState.pendingItems.filter((pi) => pi.id !== id),
    }));
  };

  removeAllPendingItems = () => {
    if (window.confirm('Do you want to remove all items?'))
      this.setState({ pendingItems: [] });
  };

  closeForm = () => this.setState({ showForm: false });
  showForm = () => this.setState({ showForm: true });

  closeSearchResults = () => this.setState({ showSearchResults: false });
  showSearchResults = () => this.setState({ showSearchResults: true });

  mapItems = (d) => {
    return {
      id: d._id,
      barcode: d._id,
      name: d.item_name,
      kiloAble: d.kiloable,
      suppliers: d.suppliers.map((s) => ({
        id: s.id,
        supplierName: s.supplier_name,
      })),
    }
  }

  handleSearchBarChange = (e) => {
    const val = e.target.value;

    if (val) {
      Api.getItems(this.context.state.jwt, {item_name_contains: val}).then(({ data }) => {
        data = data.map(this.mapItems);

        this.setState({searchResults: data});
        this.showSearchResults();
      });
    } else if (!val && this.state.searchResults.length > 0) {
      this.showSearchResults();
    } else {
      this.closeSearchResults();
    }
  };

  handleSearchBarFocus = (e) => {
    const val = e.target.value;
    if (!val) {
      Api.getItems(this.context.state.jwt, { _limit: 10 }).then(({ data }) => {
        data = data.map(this.mapItems);
        this.setState({ searchResults: data });
        this.showSearchResults();
      });
    } else if (val && this.state.searchResults.length > 0 && !this.state.showSearchResults) this.showSearchResults();
  }

  handleSearchBarBlur = (e) => {
    setTimeout(() => this.closeSearchResults(), 100);
  }

  handleSearchBarItemClick = (newFormValue) => {
    const fGRef = this.state.formGroupRef.current;
    if (fGRef) {
      fGRef.classList.remove('form-group-container');
      setTimeout(() => fGRef.classList.add('form-group-container'), 100)
    }

    this.closeSearchResults();

    this.setState((prevState, props) => {
      return {
        mainForm: {
          ...prevState.mainForm,
          ...newFormValue,
          supplierValue: newFormValue.suppliers[0].supplierName,
          supplierId: newFormValue.suppliers[0].id,
        },
      };
    });
    this.showForm();
  };

  handleSubmitConfirm = (e) => {
    console.log('submit')
    console.log(this.state.pendingItems);
  }

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
        }}
      >
        <MainLayout>
          <div className="container-fluid">
            <div className="row h-100 pb-4">
              <div className="col-md-8">
                <MainFormLayout></MainFormLayout>
              </div>
              <div className="col-md-4">
                <PendingItemsLayout />
              </div>
            </div>
          </div>
        </MainLayout>
        {this.state.showConfirmModal && <ModalConfirm
          confirmItems={this.state.pendingItems.map((pi) => ({id: pi.id, leftText: `${pi.quantity} x ${pi.name}`, rightText: pi.supplierName}))}
        />}
        {this.state.isLoading && <ModalLoading />}
      </InventoryContext.Provider>
    );
  }
}

export default Inventory;
