import React from 'react';

import {Nav} from '../components';

const MainNav = () => (
  <>
    <Nav.TopLeftNav />
    <div>
      <Nav.TopRightNav username="Juan 1" hasBackBtn />
    </div>
  </>
);

export default MainNav;
