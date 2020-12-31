import React, { useContext } from 'react';

import Button from 'react-bootstrap/Button';
import ModalLayout from '../layout/ModalLayout';
import Card from './Card';

import profilePic from '../assets/images/profile_male.png';
import './ModalLogin.css';

class ModalLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  validatePassword = (e) => {
    const regex = /^[0-9\b]+$/;

    if (e.target.value === '' || regex.test(e.target.value))
      this.setState({ value: e.target.value });

    console.log(e.target.value, this.state);
    this.props.onChange(e);
  };

  render() {
    return (
      <>
        <ModalLayout handleClose={this.props.handleClose}>
          <Card img={profilePic} label={this.props.user} noLink noBotMargin />
          <input
            onChange={this.validatePassword}
            value={this.state.value}
            type="password"
            placeholder="Enter pin"
            className="login-input"
            maxLength="4"
            pattern="[0-9]*"
            inputMode="numeric"
            autoFocus
          />
          <Button onClick={this.props.handleLogin} className="login-btn">
            Login
          </Button>
        </ModalLayout>
      </>
    );
  }
}

export default ModalLogin;
