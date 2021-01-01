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
        supplierValue: '',
        quantity: null,
        kilo: null,
      },
      confirmItems: [], // TODO: Merge this with pending items
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

    /* for (let i = 0; i < 50; i++) {
      this.state.searchResults.push({
        id: `${i}`,
        name: `item ${i}`,
        barcode: `5fe2ff51ab328745dc2312${i.toString().padStart(2, '0')}`,
        kiloAble: i > 10,
      });
    } */

    for (let i = 0; i < 10; i++) {
      this.state.confirmItems.push({
        id: i,
        quantity: i,
        item: `item ${i}`,
        info: `5fe2ff51ab328745dc23124${i}`,
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

  removeDuplicate() {
    const {
      itemBarcode,
      supplierValue,
    } = this.state.mainForm;

    const isDuplicated = this.state.pendingItems.some((pi) => pi.textBelow === itemBarcode && pi.supplier === supplierValue);

    if (isDuplicated) {
      const isConfirmed = window.confirm("Item already added, do you want to replace the item?");

      if (isConfirmed) {
        this.setState((prevState, props) => {
          const newPendingItems = prevState.pendingItems.filter(
            (pi) => pi.id !== itemBarcode && pi.supplier !== supplierValue
          );

          return {
            pendingItems: newPendingItems,
          };
        });
      }
    }
  }

  addPendingItems = () => {
    if (!this.isValidForm()) return;

    this.removeDuplicate();

    // TODO: Prevent duplicates
    // TODO: Ask user if he wants to replace the existing item
    const {
      itemText,
      itemBarcode,
      supplierValue,
      quantity,
    } = this.state.mainForm;

    this.setState((prevState, props) => ({
      pendingItems: [
        {
          id: itemBarcode + this.pendingItemsCounter++,
          name: itemText,
          supplier: supplierValue,
          quantity: quantity,
          textBelow: itemBarcode,
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

  handleSearchBarChange = (e) => {
    const val = e.target.value;

    if (val) {
      Api.getItems(this.context.state.jwt, {item_name_contains: val}).then(({ data }) => {
        data = data.map((d) => ({id: d._id, barcode: d._id, name: d.item_name, kiloAble: d.kiloable}));
        this.setState({searchResults: data});
        this.showSearchResults();
      });
    } else {
      this.closeSearchResults();
    }
  };

  handleSearchBarFocus = (e) => {
    const val = e.target.value;
    if (!val) {
      Api.getItems(this.context.state.jwt, { _limit: 10 }).then(({ data }) => {
        data = data.map((d) => ({
          id: d._id,
          barcode: d._id,
          name: d.item_name,
          kiloAble: d.kiloable,
        }));
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
    this.setState((prevState, props) => ({
      mainForm: { ...prevState.mainForm, ...newFormValue, supplierValue: prevState.mainForm.suppliers[0].value },
    }));
    this.showForm();
  };

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
        {this.state.showConfirmModal && <ModalConfirm />}
        {this.state.isLoading && <ModalLoading />}
      </InventoryContext.Provider>
    );
  }
}

export default Inventory;
