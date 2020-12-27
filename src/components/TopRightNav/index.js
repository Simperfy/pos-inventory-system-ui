import React from 'react';

const TopRightNav = ({ username }) => (
  <>
    <p>{username}</p>
    <a href="/#">Logout</a>
  </>
);

export default TopRightNav;
