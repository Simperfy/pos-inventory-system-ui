import React from 'react';

import PendingItem from '../components/PendingItem';
import FormButton from '../components/FormButton';

import { InventoryContext } from '../context/InventoryContext';

class PendingItemsLayout extends React.Component {
  static contextType = InventoryContext;

  constructor(props) {
    super(props);

    this.removeAllStyle = {
      fontSize: '0.875rem',
      opacity: 0.7,
      float: 'right',
      padding: 0,
      marginBottom: '1.5rem',
    };
  }

  render() {
    return (
      <div className="pending-items-container px-4 d-flex flex-column  justify-content-between">
        <div className="pending-item-scrollable-inventory ">
          {this.context.state.pendingItems.length > 0 && (
            <FormButton
              handleClick={this.context.removeAllPendingItems}
              color="red"
              style={this.removeAllStyle}
              text="remove all"
            />
          )}
          <div style={{ clear: 'both' }}></div>
          {this.context.state.pendingItems.map((pi) => (
            <PendingItem
              key={pi.id}
              id={pi.id}
              quantity={pi.quantity}
              name={pi.name}
              textBelow={pi.barcode}
              textBelow2={pi.supplier}
            />
          ))}
        </div>

        {this.context.state.pendingItems.length > 0 &&
         <FormButton
          color="blue"
          solid
          style={{ padding: 0, width: '100%' }}
          text="Submit Inventory"
          handleClick={() => this.context.setState({ showConfirmModal: true })}
        />}
      </div>
    );
  }
}

export default PendingItemsLayout;
