import React from 'react';

import Button from 'react-bootstrap/Button';
import ModalLayout from '../../containers/ModalLayout';
import Card from '../Card/Card';

import './ModalLogin.css';

class ModalLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  validatePassword = (e) => {
    const regex = /^[0-9\b]+$/;

    if (e.target.value === '' || regex.test(e.target.value)) {
      this.setState({value: e.target.value});
    }

    this.props.onChange(e);
  };

  render() {
    return (
      <>
        <ModalLayout handleClose={this.props.handleClose}>
          <Card img={this.props.img} label={this.props.user} noLink noBotMargin />
          <div>
            {this.props.incorrectPassword && <p className="text-center text-danger m-0">Incorrect pin</p>}
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
          </div>
          <Button onClick={this.props.handleLogin} className="login-btn">
            Login
          </Button>
        </ModalLayout>
      </>
    );
  }
}

export default ModalLogin;
