import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';
import { getRoute } from '../routeConfig';

import { AppContext } from '../context/AppContext';

import './TopRightNav.css';

const TopRightNav = ({ username, hasBackBtn }) => {
  const history = useHistory();
  const { logout } = useContext(AppContext);

  return (
    <>
      <p className="top-right-nav">{username}</p>
      <a
        href="/#"
        className="top-right-nav"
        onClick={() => {
          logout();
          history.push(getRoute('home'))
        }}
      >
        Logout
      </a>
    </>
  );
};

export default TopRightNav;
