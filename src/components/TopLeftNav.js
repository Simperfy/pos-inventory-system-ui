import React from 'react';

import { useHistory } from 'react-router-dom';
import { getRoute } from '../routeConfig';

import { ReactComponent as LeftArrowIcon } from '../assets/icons/left-arrow.svg';
import { ReactComponent as InventoryIcon } from '../assets/icons/inventory.svg';

import './TopLeftNav.css';

const TopLeftNav = () => {
  const history = useHistory();

  return (
    <div className="top-left-nav">
      <LeftArrowIcon
        onClick={() => history.push(getRoute('selection'))}
        className="ml-3 back-btn"
      />
      <InventoryIcon className="inventory-icon" width="32" height="32" />
      <span className="main-title">Inventory</span>
    </div>
  );
};

export default TopLeftNav;
