import React from 'react';

import './style.css';

const TopRightNav = ({ username, hasBackBtn }) => (
  <>
    <p className="top-right-nav">{username}</p>
    <a href="/#" className="top-right-nav">
      Logout
    </a>
  </>
);

export default TopRightNav;
