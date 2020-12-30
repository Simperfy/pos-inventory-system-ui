import React from 'react';

import PendingItems from '../components/PendingItems';
import FormButtonPrimary from '../components/FormButtonPrimary';

import {InventoryContext} from '../context/InventoryContext';

class PendingItemsLayout extends React.Component {
  static contextType = InventoryContext;

  render() {
    return (
      <div className="pending-items-container px-4 d-flex flex-column justify-content-between">
        <div>
          <PendingItems />
        </div>
        <FormButtonPrimary
          style={{ padding: 0, width: '100%' }}
          text="Submit Inventory"
          handleAdd={() => this.context.setState({showConfirmModal: true})}
        />
      </div>
    );
  }
}

export default PendingItemsLayout;
