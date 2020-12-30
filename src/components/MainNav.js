import React from 'react';

import TopLeftNav from './TopLeftNav';
import TopRightNav from './TopRightNav';

const MainNav = () => (
  <>
    <TopLeftNav />
    <div>
      <TopRightNav username="Juan 1" hasBackBtn />
    </div>
  </>
);

export default MainNav;
