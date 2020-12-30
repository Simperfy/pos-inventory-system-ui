import React from 'react';

import { useHistory } from 'react-router-dom';

import './TopRightNav.css';

const TopRightNav = ({ username, hasBackBtn }) => {
  const history = useHistory();

  return (
    <>
      <p className="top-right-nav">{username}</p>
      <a
        href="/#"
        className="top-right-nav"
        onClick={() => history.push('/')}
      >
        Logout
      </a>
    </>
  );
};

export default TopRightNav;
