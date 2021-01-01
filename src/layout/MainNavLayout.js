import React from 'react';

import c from '../components';

const MainNav = () => (
  <>
    <c.Nav.TopLeftNav />
    <div>
      <c.Nav.TopRightNav username="Juan 1" hasBackBtn />
    </div>
  </>
);

export default MainNav;
