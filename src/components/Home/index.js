import React from 'react';
import Row from 'react-bootstrap/Row';

import Profile from '../Profile';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [
        { id: 1, user: 'Juan 10' },
        { id: 2, user: 'Juan 20' },
        { id: 3, user: 'Juan 30' },
        { id: 4, user: 'Juan 40' },
      ],
    };
  }

  render() {
    return (
      <Row className="justify-content-around" style={{ marginTop: '3.75rem' }}>
        {this.state.users.map((u) => (
          <Profile key={u.id} user={u.user} />
        ))}
      </Row>
    );
  }
}

export default Home;
