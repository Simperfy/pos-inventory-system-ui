import React from 'react';

import Row from 'react-bootstrap/Row';

import MainLayoutNav from './MainLayoutNav';

import './MainLayout.css';

const MainLayout = ({type, children}) => (
    <>
        <Row className="justify-content-between mb-5">
            <MainLayoutNav type={type}/>
        </Row>
        <Row className="mx-0 flex-grow-1">{children}</Row>
    </>
);


export default MainLayout;
