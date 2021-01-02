import React from 'react';

import {Form} from '../components';
import PendingItem from '../components/PendingItem';

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

    this.pendingItemsContainerStyle = {
      borderLeft: "0.5px solid rgba(0, 0, 0, 0.2)",
      height: "100%"
    }
  }

  render() {

    return (
      <div style={this.pendingItemsContainerStyle} className="px-4 d-flex flex-column justify-content-between">
        <div className="pending-item-scrollable-inventory ">
          {this.context.state.pendingItems.length > 0 && (
            <Form.FormButton
              handleClick={this.context.removeAllPendingItems}
              color="red"
              style={this.removeAllStyle}
              text="remove all"
            />
          )}
          <div style={{ clear: 'both' }} />
          {this.context.state.pendingItems.map((pi) => (
            <PendingItem
              key={pi.id}
              id={pi.id}
              quantity={pi.quantity}
              name={`${pi.name} ${pi.kilo > 0 ? `(${pi.kilo} kg)` : ''}`}
              textBelow={pi.barcode}
              textBelow2={pi.supplierName}
            />
          ))}
        </div>

        {this.context.state.pendingItems.length > 0 &&
         <Form.FormButton
          color="blue"
          solid
          style={{ padding: 0, width: '100%' }}
          text="Submit Inventory"
          handleClick={() => this.context.setState({ isConfirming: true })}
        />}
      </div>
    );
  }
}

export default PendingItemsLayout;
