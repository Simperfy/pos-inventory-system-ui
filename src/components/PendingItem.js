import React, { useContext } from 'react';

import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg';
import { InventoryContext } from '../context/InventoryContext';

import './PendingItem.css';

function PendingItem({ id, quantity, name, textBelow, textBelow2, textRight }) {
  const { removePendingItem } = useContext(InventoryContext);

  return (
    <>
      <div className="pending-item">
        <div className="d-flex justify-content-between">
          <p>
            {quantity} x {name}
          </p>
          <div className="d-flex" style={{ maxWidth: "10rem", }}>
            <p className="text-right">{ textRight }</p>
            <button onClick={() => removePendingItem(id)} type="button">
              <DeleteIcon className="delete-icon" />
            </button>
          </div>
        </div>
        <span style={{lineHeight: 1}} className="barcode">{textBelow} {textBelow2 && <br/>} {textBelow2}</span>
      </div>
    </>
  );
}

export default PendingItem;
