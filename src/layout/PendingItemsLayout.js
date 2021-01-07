import React from 'react';

import {Form} from '../components';
import PendingItem from '../components/PendingItem';
import pendingItemTypes from '../enums/enumPendingItemTypes';
import {connect} from 'react-redux';
import {addPendingItem, removeAllPendingItems} from '../actions/pendingItemsActions';

class PendingItemsLayout extends React.Component {
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
      borderLeft: '0.5px solid rgba(0, 0, 0, 0.2)',
      height: '100%',
    };
  }

  render() {
    const showTotal = this.props.pendingItems.length > 0 && this.props.pendingItemTypes === pendingItemTypes.sales;

    return (
      <div style={this.pendingItemsContainerStyle} className="px-4 d-flex flex-column justify-content-between">
        <div className="pending-item-scrollable-inventory ">
          {this.props.pendingItems.length > 0 && (
            <Form.FormButton
              handleClick={this.props.removeAllPendingItems}
              color="red"
              style={this.removeAllStyle}
              text="remove all"
            />
          )}
          <div style={{clear: 'both'}} />
          {this.props.pendingItems.map((pi) => {
            if (this.props.pendingItemTypes === pendingItemTypes.inventory) {
              return (
                <PendingItem
                  key={pi.id}
                  id={pi.id}
                  quantity={pi.quantity}
                  name={`${pi.name} ${pi.kilo > 0 ? `(${pi.kilo} kg)` : ''}`}
                  textBelow={pi.barcode}
                  textBelow2={pi.supplierName}
                  removePendingItem={this.props.removePendingItem}
                />
              );
            } else if (this.props.pendingItemTypes === pendingItemTypes.sales) {
              const textRight = `₱${((pi.price - pi.discount) * pi.quantity).toFixed(2)}`;
              const totalDiscount = pi.discount * pi.quantity;
              const textRightBelow = `₱${(totalDiscount).toFixed(2)}`;

              return (
                <PendingItem
                  key={pi.id}
                  id={pi.id}
                  quantity={pi.quantity}
                  name={`${pi.name} ${pi.kilo > 0 ? `(${pi.kilo} kg)` : ''}`}
                  textBelow={pi.barcode}
                  // textBelow2={pi.supplierName}
                  textRight={textRight}
                  textRightStyle={{fontSize: '1.2rem'}}
                  textRightBelow={totalDiscount > 0 && textRightBelow}
                  removePendingItem={this.props.removePendingItem}
                />
              );
            }
          })}
        </div>

        <div>
          {showTotal &&
            <p className={'text-center'} style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Total: ₱{this.props.pendingItems.reduce((acc, pi) => {
              return acc + (pi.price - pi.discount) * pi.quantity;
            }, 0).toFixed(2)}
            </p>
          }
          {this.props.pendingItems.length > 0 &&
           <Form.FormButton
             color="blue"
             solid
             style={{padding: 0, width: '100%'}}
             text={'Submit ' + (this.props.pendingItemTypes === pendingItemTypes.inventory ? 'Inventory' : 'Sales') }
             handleClick={() => this.props.setState({isConfirming: true})}
           />}
        </div>
      </div>
    );
  }
}

// export default PendingItemsLayout;
export default connect((state) => ({
  pendingItems: state.pending.pendingItems,
}), {addPendingItem, removeAllPendingItems},
)(PendingItemsLayout);
