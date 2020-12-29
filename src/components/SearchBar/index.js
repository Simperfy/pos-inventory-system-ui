import React from 'react';
import SearchBarItem from '../SearchBarItem';

import { ReactComponent as Magnify } from '../../assets/icons/magnify.svg';

import './style.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [
        { name: 'item 1', barcode: '5fe2ff51ab328745dc231241' },
        { name: 'item 2', barcode: '5fe2ff51ab328745dc231242' },
        { name: 'item 3', barcode: '5fe2ff51ab328745dc231243' },
      ],
      showResults: false,
    };
  }

  handleChange = (e) => {
    if (e.target.value) this.setState({ showResults: true });
    else this.setState({ showResults: false });
  };

  render() {
    return (
      <div className="search-group">
        <div className="search-bar">
          <input
            className="search-bar-input"
            type="text"
            placeholder="Item / 5fe2ff51ab328745dc231241"
            onChange={this.handleChange}
          />
          <button type="button" className="search-btn align-text-bottom">
            <Magnify className="search-icon" />
          </button>
        </div>

        {this.state.showResults && (
          <div style={{ position: 'fixed', width: '65%' }}>
            {this.state.results.map((res) => (
              <SearchBarItem name={res.name} barcode={res.barcode} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default SearchBar;
