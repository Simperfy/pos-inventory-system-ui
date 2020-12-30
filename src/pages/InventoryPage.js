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

  render() {
    return (
      <InventoryContext.Provider
        value={{ state: this.state, setState: this.setState.bind(this) }}
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
