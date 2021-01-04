import React from 'react';

import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg';

import './PendingItem.css';

function PendingItem({ id, quantity, name, textBelow, textBelow2, textRight, textRightStyle, textRightBelow, removePendingItem }) {

  const style = {
    textRightBelow: {
      lineHeight: 1,
      overflow: "hidden",
      maxWidth: "5rem",
      display: "inline-block",
      textOverflow: "ellipsis",
      textDecoration: "line-through"
    }
  }

  return (
    <>
      <div className="pending-item">
        <div className="d-flex justify-content-between">
          <p>
            {quantity} x {name}
            <br/>
            <span style={{lineHeight: 1}} className="barcode">{textBelow} {textBelow2 && <br/>} {textBelow2}</span>
          </p>
          <div className="d-flex" style={{ maxWidth: "10rem", }}>
            <div>
              <p className="text-right" style={textRightStyle}>
                { textRight }
                <br/>
                <span style={style.textRightBelow} className="barcode">{textRightBelow}</span>
              </p>
            </div>
            <button onClick={() => removePendingItem(id)} type="button">
              <DeleteIcon className="delete-icon" />
            </button>
          </div>
        </div>
        {/*<span style={{lineHeight: 1}} className="barcode">{textBelow} {textBelow2 && <br/>} {textBelow2}</span>*/}
      </div>
    </>
  );
}

export default PendingItem;
