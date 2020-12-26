import React from 'react';

import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import Profile from '../Profile';

import CloseBtn from '../../assets/icons/close.svg';
import './style.css';

class ModalLogin extends React.Component {

  render() {
    return (
      <>
        <div className="login-overlay" />
        <div className="login-modal">
          <Row className="flex-column align-items-center justify-content-between h-100">
            <a href="/#" className="login-close" onClick={() => this.props.handleClose()}>
              <img src={CloseBtn} style={{ width: 36 }} alt="close button" />
            </a>
            <Profile user={this.props.user} noLink noBotMargin />
            <input
              type="password"
              placeholder="Enter pin"
              className="login-input"
              maxLength="4"
              autoFocus
            />
            <Button className="login-btn">Login</Button>
          </Row>
        </div>
      </>
    );
  }
}

export default ModalLogin;
