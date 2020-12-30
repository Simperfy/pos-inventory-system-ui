import React from 'react';

import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg';

import './PendingItems.css';

function PendingItems() {
  const PendingItems = [
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

  return (
    <>
      {PendingItems.map((pi) => (
        <div key={pi.id} className="pending-item">
          <div className="d-flex justify-content-between">
            <p>
              {pi.quantity} x {pi.name}
            </p>
            <button onClick={() => console.log('delete')} type="button">
              <DeleteIcon className="delete-icon" />
            </button>
          </div>
          <span className="barcode">{pi.textBelow}</span>
        </div>
      ))}
    </>
  );
}

export default PendingItems;
