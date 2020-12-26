import React from 'react';
import Row from 'react-bootstrap/Row';

import ModalLogin from '../ModalLogin';
import Profile from '../Profile';

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

  handleClick = (user) => {
    this.setState({ selectedUser: user, showModal: true });
    console.log('set: ', user);
  };

  render() {
    return (
      <>
        <Row
          className="justify-content-around"
          style={{ marginTop: '3.75rem' }}
        >
          {this.state.users.map((u) => (
            <Profile key={u.id} user={u.user} handleClick={this.handleClick} />
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
