import React, {useContext} from 'react';

import {Nav} from '../components';
import {AppContext} from '../context/AppContext';

const MainLayoutNav = ({type}) => {
  const {state: {user: {username}}} = useContext(AppContext);

  return <>
    <Nav.TopLeftNav type={type}/>
    <div>
      <Nav.TopRightNav username={username} hasBackBtn/>
    </div>
  </>;
};

export default MainLayoutNav;
