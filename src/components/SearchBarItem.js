import React from 'react';

import './SearchBarItem.css';

function SearchBarItem({ name, barcode }) {
  return (
    <div className="search-bar-item d-flex justify-content-between">
      <p className="sb-label">{name}</p>
      <p className="sb-id">{barcode}</p>
    </div>
  );
}

export default SearchBarItem;
