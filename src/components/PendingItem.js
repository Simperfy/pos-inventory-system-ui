import React from 'react';

import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg';

import './PendingItem.css';

function PendingItem({ quantity, name, textBelow }) {
  return (
    <>
      <div className="pending-item">
        <div className="d-flex justify-content-between">
          <p>
            {quantity} x {name}
          </p>
          <button onClick={() => console.log('delete')} type="button">
            <DeleteIcon className="delete-icon" />
          </button>
        </div>
        <span className="barcode">{textBelow}</span>
      </div>
    </>
  );
}

export default PendingItem;
