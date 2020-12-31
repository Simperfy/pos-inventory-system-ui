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
    };

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
    this.setState((prevState, props) => {
      return {
        pendingItems: prevState.pendingItems.filter((pi) => pi.id !== id),
      };
    });
  };

  render() {
    return (
      <InventoryContext.Provider
        value={{
          state: this.state,
          setState: this.setState.bind(this),
          addPendingItems: this.addPendingItems,
          removePendingItem: this.removePendingItem,
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
