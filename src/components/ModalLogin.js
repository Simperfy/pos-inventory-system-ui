import React from 'react';

import Button from 'react-bootstrap/Button';
import ModalLayout from '../layout/ModalLayout';
import Card from './Card';

import profilePic from '../assets/images/profile_male.png';
import './ModalLogin.css';

function ModalLogin({ user, handleClose }) {
  return (
    <>
      <ModalLayout handleClose={handleClose}>
        <Card img={profilePic} label={user} noLink noBotMargin />
        <input
          type="password"
          placeholder="Enter pin"
          className="login-input"
          maxLength="4"
          autoFocus
        />
        <Button className="login-btn">Login</Button>
      </ModalLayout>
    </>
  );
}

export default ModalLogin;
