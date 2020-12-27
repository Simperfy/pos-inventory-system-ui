import React from 'react';

import TopLeftNav from '../../components/TopLeftNav';
import TopRightNav from '../../components/TopRightNav';

const MainNav = () => (
  <>
    <TopLeftNav />
    <div>
      <TopRightNav username="Juan 1" hasBackBtn />
    </div>
  </>
);

export default MainNav;
