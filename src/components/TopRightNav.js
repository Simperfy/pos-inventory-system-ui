import React from 'react';

import './TopRightNav.css';

const TopRightNav = ({ username, hasBackBtn }) => (
  <>
    <p className="top-right-nav">{username}</p>
    <a href="/#" className="top-right-nav">
      Logout
    </a>
  </>
);

export default TopRightNav;
