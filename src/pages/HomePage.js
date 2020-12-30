import React from 'react';
import Row from 'react-bootstrap/Row';

import ModalLogin from '../components/ModalLogin';
import Card from '../components/Card';

import profilePic from '../assets/images/profile_male.png';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      selectedUser: null,
      users: [
        { id: 1, user: 'Juan 1' },
        { id: 2, user: 'Juan 2' },
        { id: 3, user: 'Juan 3' },
        { id: 4, user: 'Juan 4' },
      ],
    };
  }

  handleClose = () => this.setState({ showModal: false });

  handleClick = (user) =>
    this.setState({ selectedUser: user, showModal: true });

  render() {
    return (
      <>
        <Row
          className="justify-content-around"
          style={{ marginTop: '3.75rem' }}
        >
          {this.state.users.map((u) => (
            <Card key={u.id} img={profilePic} label={u.user} handleClick={this.handleClick} />
          ))}
        </Row>
        {this.state.showModal && (
          <ModalLogin
            user={this.state.selectedUser}
            handleClose={this.handleClose}
          />
        )}
      </>
    );
  }
}

export default Home;
