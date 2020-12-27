import React from 'react';

import Row from 'react-bootstrap/Row';

import MainNav from '../../components/MainNav';


import './style.css';

class MainLayout extends React.Component {
  render() {
    return (
      <>
        <Row className="justify-content-between">
          <MainNav/>
        </Row>
        <h1>MainLayout</h1>
        {this.props.children}
      </>
    );
  }
}

export default MainLayout;
