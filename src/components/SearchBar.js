import React from 'react';
import SearchBarItem from './SearchBarItem';

import { ReactComponent as Magnify } from '../assets/icons/magnify.svg';
import { InventoryContext } from '../context/InventoryContext';

import './SearchBar.css';
import '../assets/css/global-style.css';

class SearchBar extends React.Component {
  static contextType = InventoryContext;

  render() {
    return (
      <div className="row">
        <div className="search-group">
          <div className="search-bar">
            <input
              className="search-bar-input"
              type="text"
              placeholder="Item / 5fe2ff51ab328745dc231241"
              onChange={this.context.handleSearchBarChange}
              onFocus={this.context.handleSearchBarFocus}
              onBlur={this.context.handleSearchBarBlur}
            />
            <button type="button" className="search-btn align-text-bottom">
              <Magnify className="search-icon" />
            </button>
          </div>

          {this.context.state.showSearchResults && (
            <div className="search-items-container">
              {this.context.state.searchResults.map((res) => (
                <SearchBarItem
                  key={res.id}
                  name={res.name}
                  barcode={res.barcode}
                  onClick={() => this.context.handleSearchBarItemClick({itemText: res.name, itemBarcode: res.id})}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBar;
