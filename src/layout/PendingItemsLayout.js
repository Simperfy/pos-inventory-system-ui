import React from 'react';

import PendingItems from '../components/PendingItems';
import FormButton from '../components/FormButton';

import {InventoryContext} from '../context/InventoryContext';

class PendingItemsLayout extends React.Component {
  static contextType = InventoryContext;

  render() {
    return (
      <div className="pending-items-container px-4 d-flex flex-column justify-content-between">
        <div>
          <PendingItems />
        </div>
        <FormButton
        color="blue"
        solid
          style={{ padding: 0, width: '100%' }}
          text="Submit Inventory"
          handleClick={() => this.context.setState({showConfirmModal: true})}
        />
      </div>
    );
  }
}

export default PendingItemsLayout;
