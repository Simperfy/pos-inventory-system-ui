import React from 'react';

import PendingItem from '../components/PendingItem';
import FormButton from '../components/FormButton';

import { InventoryContext } from '../context/InventoryContext';

class PendingItemsLayout extends React.Component {
  constructor(props) {
    super(props);
    this.pendingItems = [
      {
        id: 1,
        name: 'item1',
        quantity: 1,
        textBelow: '5fe2ff51ab328745dc231241',
      },
      {
        id: 2,
        name: 'item2',
        quantity: 1,
        textBelow: '5fe2ff51ab328745dc231242',
      },
      {
        id: 3,
        name: 'item3',
        quantity: 1,
        textBelow: '5fe2ff51ab328745dc231243',
      },
    ];
  }
  static contextType = InventoryContext;

  render() {
    return (
      <div className="pending-items-container px-4 d-flex flex-column justify-content-between">
        <div>
          {this.pendingItems.map((pi) => (
            <PendingItem
              key={pi.id}
              quantity={pi.quantity}
              name={pi.name}
              textBelow={pi.textBelow}
            />
          ))}
        </div>
        <FormButton
          color="blue"
          solid
          style={{ padding: 0, width: '100%' }}
          text="Submit Inventory"
          handleClick={() => this.context.setState({ showConfirmModal: true })}
        />
      </div>
    );
  }
}

export default PendingItemsLayout;
