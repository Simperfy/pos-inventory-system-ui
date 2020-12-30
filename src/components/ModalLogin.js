import React, { useContext } from 'react';

import Button from 'react-bootstrap/Button';
import ModalLayout from '../layout/ModalLayout';
import Card from './Card';

import profilePic from '../assets/images/profile_male.png';
import './ModalLogin.css';

import { AppContext } from '../context/AppContext';
import { useHistory } from "react-router-dom";
import { getRoute } from '../routeConfig';

function ModalLogin({ user, handleClose }) {
  const {isLoggedIn} = useContext(AppContext);
  const history = useHistory();

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
        <Button onClick={() => history.push(getRoute('selection'))} className="login-btn">Login</Button>
      </ModalLayout>
    </>
  );
}

export default ModalLogin;
