import React from 'react';

import MainLayout from '../layout/MainLayout';
import MainFormLayout from '../layout/MainFormLayout';
import PendingItemsLayout from '../layout/PendingItemsLayout';
import ModalConfirm from '../components/ModalConfirm';
import { InventoryContext } from '../context/InventoryContext';

import './InventoryPage.css';

class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pendingItems: [],
      suppliers: [
        { id: 1, name: 'supplier 1', value: 'supplier 1' },
        { id: 2, name: 'supplier 2', value: 'supplier 2' },
        { id: 3, name: 'supplier 3', value: 'supplier 3' },
      ],
      confirmItems: [],
      showConfirmModal: false,
      showForm: false,
      searchResults: [],
      showSearchResults: false,
    };

    for (let i = 0; i < 50; i++)
      this.state.searchResults.push({
        id: `${i}`,
        name: `item ${i}`,
        barcode: `5fe2ff51ab328745dc2312${i.toString().padStart(2, '0')}`,
      });

    for (let i = 0; i < 10; i++) {
      this.state.confirmItems.push({
        id: i,
        quantity: i,
        item: `item ${i}`,
        info: `5fe2ff51ab328745dc23124${i}`,
      });
    }
  }

  counter = 0; // @TODO: DELETE AFTER MOCKING

  addPendingItems = () => {
    // @TODO: Prevent duplicates
    // @TODO: Ask user if he wants to replace the existing item
    this.counter++;
    this.setState((prevState, props) => ({
      pendingItems: [
        {
          id: this.counter,
          name: `item ${this.counter}`,
          quantity: 1,
          textBelow: '5fe2ff51ab328745dc231243',
        },
        ...prevState.pendingItems,
      ],
    }));
  };

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
    if (e.target.value) this.showSearchResults();
    else this.closeSearchResults();
  };

  handleSearchBarItemClick = (id) => {
    this.closeSearchResults();
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
      </InventoryContext.Provider>
    );
  }
}

export default Inventory;
