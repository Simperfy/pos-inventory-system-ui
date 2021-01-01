import React from 'react';

import c from '../components';

import Row from 'react-bootstrap/Row';
import InventoryLogo from '../assets/icons/inventory.svg';
import MoneyLogo from '../assets/icons/money.svg';

import { useHistory } from 'react-router-dom';
import { getRoute } from '../routeConfig';

const SelectionScreen = () => {
  const history = useHistory();

  return (
    <div className="vh-100">
      <Row className="justify-content-end">
        <c.Nav.TopRightNav username="Juan 1" />
      </Row>
      <Row className="justify-content-center align-content-center h-75">
        <c.Card.Card
          img={InventoryLogo}
          handleClick={() => history.push(getRoute('inventory'))}
          label="Inventory"
          className="mr-4"
        />
        <c.Card.Card
          style={{ opacity: '0.2' }}
          img={MoneyLogo}
          handleClick={() => console.log('sales')}
          label="Sales"
          className="ml-4"
          notAllowed
        />
      </Row>
    </div>
  );
};

export default SelectionScreen;
