import React from 'react';

import { useHistory } from 'react-router-dom';
import { getRoute } from '../routeConfig';

import './TopRightNav.css';

const TopRightNav = ({ username, hasBackBtn }) => {
  const history = useHistory();

  return (
    <>
      <p className="top-right-nav">{username}</p>
      <a
        href="/#"
        className="top-right-nav"
        onClick={() => history.push(getRoute('home'))}
      >
        Logout
      </a>
    </>
  );
};

export default TopRightNav;
