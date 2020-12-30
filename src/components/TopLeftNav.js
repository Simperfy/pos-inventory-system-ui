import React from 'react';

import { ReactComponent as LeftArrowIcon } from '../assets/icons/left-arrow.svg';
import { ReactComponent as InventoryIcon } from '../assets/icons/inventory.svg';

import './TopLeftNav.css'

const TopLeftNav = () => (
  <div className="top-left-nav">
    <LeftArrowIcon
      className="ml-3 back-btn"
    />
    <InventoryIcon className="inventory-icon" width="32" height="32" />
    <span className="main-title">Inventory</span>
  </div>
);

export default TopLeftNav;
