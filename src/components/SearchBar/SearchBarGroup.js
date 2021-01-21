import React from 'react';
import SearchBarItem from './SearchBarItem';

import {ReactComponent as Magnify} from '../../assets/icons/magnify.svg';

import './SearchBarGroup.css';
import '../../assets/css/global-style.css';
import {connect} from 'react-redux';

class SearchBarGroup extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="search-group">
          <div className="search-bar">
            <input
              className="search-bar-input"
              type="text"
              placeholder="Search"
              onChange={this.props.handleSearchBarChange}
              onFocus={this.props.handleSearchBarFocus}
              onBlur={this.props.handleSearchBarBlur}
            />
            <button type="button" className="search-btn align-text-bottom">
              <Magnify className="search-icon" />
            </button>
          </div>

          {this.props.showSearchResults && (
            <div className="search-items-container">
              {this.props.searchResults.map((res) => (
                <SearchBarItem
                  key={res.id}
                  name={res.name}
                  remaining={res.remaining}
                  barcode={res.barcode}
                  onClick={() => this.props.handleSearchBarItemClick(res)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  searchResults: state.searchResults,
}), {})(SearchBarGroup);
