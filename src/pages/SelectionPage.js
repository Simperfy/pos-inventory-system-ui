import React, {useContext} from 'react';

import {Card, Nav} from '../components';

import Row from 'react-bootstrap/Row';
import InventoryLogo from '../assets/icons/inventory.svg';
import MoneyLogo from '../assets/icons/money.svg';

import { useHistory } from 'react-router-dom';
import { getRoute } from '../routeConfig';
import {AppContext} from "../context/AppContext";

const SelectionScreen = () => {
  const history = useHistory();
    const {state: {user: { username }}} = useContext(AppContext);

  return (
    <div className="vh-100">
      <Row className="justify-content-end">
        <Nav.TopRightNav username={username} />
      </Row>
      <Row className="justify-content-center align-content-center h-75">
        <Card.Card
          img={InventoryLogo}
          handleClick={() => history.push(getRoute('inventory'))}
          label="Inventory"
          className="mr-4"
        />
        <Card.Card
          // style={{ opacity: '0.2' }}
          img={MoneyLogo}
          handleClick={() => history.push(getRoute('sales'))}
          label="Sales"
          className="ml-4"
          // notAllowed
        />
      </Row>
    </div>
  );
};

export default SelectionScreen;
