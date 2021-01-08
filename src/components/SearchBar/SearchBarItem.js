import React from 'react';

import './SearchBarItem.css';

function SearchBarItem({name, barcode, remaining, onClick}) {
  let labelStyle = {};
  let divStyle = {};
  const outOfStock = remaining <= 0;

  const spanStyle = {
    color: 'red',
  };

  if (outOfStock) {
    divStyle = {
      cursor: 'not-allowed',
    };

    labelStyle = {
      color: 'red',
      textDecoration: 'line-through',
    };
  }

  return (
    <div className="search-bar-item d-flex justify-content-between" style={divStyle} onClick={outOfStock ? null : onClick}>
      <div>
        <span className="sb-label" style={labelStyle}>{name}</span>
        {outOfStock && <span style={spanStyle}>&nbsp;&nbsp;&nbsp;Out of stock</span>}
      </div>
      <p className="sb-id">{barcode}</p>
    </div>
  );
}

export default SearchBarItem;
