import React from 'react';

import Row from 'react-bootstrap/Row';

import MainNav from './MainNav';

import './MainLayout.css';

class MainLayout extends React.Component {
  render() {
    return (
      <>
        <Row className="justify-content-between mb-5">
          <MainNav />
        </Row>
        <Row className="mx-0 flex-grow-1">{this.props.children}</Row>
      </>
    );
  }
}

export default MainLayout;
