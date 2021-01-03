import React from 'react';

import {useHistory} from 'react-router-dom';

import {getRoute} from '../../routeConfig';

import {ReactComponent as LeftArrowIcon} from '../../assets/icons/left-arrow.svg';
import {ReactComponent as InventoryIcon} from '../../assets/icons/inventory.svg';
import {ReactComponent as MoneyIcon} from '../../assets/icons/money.svg';

import './TopLeftNav.css';

const TopLeftNav = ({type}) => {
    const history = useHistory();

    return (
        <div className="top-left-nav">
            <LeftArrowIcon
                onClick={() => history.push(getRoute('selection'))}
                className="ml-3 back-btn"
            />
            {type === 'inventory' && <InventoryIcon className="top-left-nav-icon" width="32" height="32"/>}
            {type === 'sales' && <MoneyIcon className="top-left-nav-icon" width="32" height="32"/>}
            <span className="main-title">{type === 'inventory' ? 'Inventory' : 'Sales'}</span>
        </div>
    );
};

export default TopLeftNav;
