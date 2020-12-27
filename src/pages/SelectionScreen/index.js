import React from 'react';

import Row from 'react-bootstrap/Row';

import Card from '../../components/Card';
import InventoryLogo from '../../assets/icons/inventory.svg';
import MoneyLogo from '../../assets/icons/money.svg';

import './style.css';

const SelectionScreen = () => {
  return (
    <div className="vh-100">
      <Row className="justify-content-end top-right-nav">
        <p>Juan 1</p>
        <a href="/#">Logout</a>
      </Row>
      <Row className="justify-content-center align-content-center h-75">
        <Card img={InventoryLogo} label="Inventory" className="mr-4" />
        <Card img={MoneyLogo} label="Sales" className="ml-4" />
      </Row>
    </div>
  );
};

export default SelectionScreen;
