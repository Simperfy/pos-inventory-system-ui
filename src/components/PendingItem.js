import React, { useContext } from 'react';

import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg';
import { InventoryContext } from '../context/InventoryContext';

import './PendingItem.css';

function PendingItem({ id, quantity, name, textBelow }) {
  const { removePendingItem } = useContext(InventoryContext);

  return (
    <>
      <div className="pending-item">
        <div className="d-flex justify-content-between">
          <p>
            {quantity} x {name}
          </p>
          <button onClick={() => removePendingItem(id)} type="button">
            <DeleteIcon className="delete-icon" />
          </button>
        </div>
        <span className="barcode">{textBelow}</span>
      </div>
    </>
  );
}

export default PendingItem;
