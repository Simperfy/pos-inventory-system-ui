import React from 'react';
import SearchBarItem from '../SearchBarItem';

import { ReactComponent as Magnify } from '../../assets/icons/magnify.svg';

import './style.css';

function SearchBar() {
  const results = [
    { name: 'item 1', barcode: '5fe2ff51ab328745dc231241' },
    { name: 'item 2', barcode: '5fe2ff51ab328745dc231242' },
    { name: 'item 3', barcode: '5fe2ff51ab328745dc231243' },
  ];

  return (
    <div className="search-group">
      <div className="search-bar">
        <input
          className="search-bar-input"
          type="text"
          placeholder="Item / 5fe2ff51ab328745dc231241"
        />
        {/* <img src={Magnify} alt="search icon"/> */}
        <button type="button" className="search-btn align-text-bottom">
          <Magnify className="search-icon" />
        </button>
      </div>

      {results.map((res) => (
        <SearchBarItem name={res.name} barcode={res.barcode} />
      ))}
    </div>
  );
}

export default SearchBar;
