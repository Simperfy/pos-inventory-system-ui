import React from 'react';
import SearchBarItem from '../SearchBarItem';

import { ReactComponent as Magnify } from '../../assets/icons/magnify.svg';

import './style.css';
import '../../assets/css/global-style.css'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      showResults: false,
    };

    for (let i = 0; i < 50; i++)
      this.state.results.push({
        id: `${i}`,
        name: `item ${i}`,
        barcode: `5fe2ff51ab328745dc2312${i.toString().padStart(2, '0')}`,
      });
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
          <div className="search-items-container">
            {this.state.results.map((res) => (
              <SearchBarItem key={res.id} name={res.name} barcode={res.barcode} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default SearchBar;
