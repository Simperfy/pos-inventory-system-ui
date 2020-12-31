import React from 'react';

import Row from 'react-bootstrap/Row';
import ModalLogin from '../components/ModalLogin';
import CardProfile from '../components/CardProfile';
import profileMalePic from '../assets/images/profile_male.png';
import profileFemalePic from '../assets/images/profile_female.jpg';
import axios from 'axios';
import env from 'react-dotenv';
import { getRoute } from '../routeConfig';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUserGender: '',
      selectedUser: null,
      selectedUserEmail: '',
      selectedUserPassword: '',
      showModal: false,
      incorrectPassword: false,
      users: [],
    };
  }

  componentDidMount() {
    axios.get(`${env.API_URL}/users`).then(({ data }) => {
      const users = data.map((u) => ({ id: u.id, user: u.username, email: u.email, gender: u.gender }));
      this.setState({ users: users });
    });
  }

  handleClose = () => this.setState({ showModal: false });

  handleClick = (user, email, gender) =>{
    this.setState({ selectedUser: user, selectedUserEmail: email, selectedUserGender: gender, showModal: true });
  }

  handleLogin = () => {
    this.setState({incorrectPassword: false});
    axios.post(`${env.API_URL}/auth/local`, {
      identifier: this.state.selectedUser,
      password: this.state.selectedUserPassword
    }).then(({data}) => console.log(data))
    .catch((err) => {
      const statusCode = err.response.data.statusCode;
      if (statusCode >= 400 && statusCode < 500) this.setState({incorrectPassword: true});
    });
    // this.props.history.push(getRoute('selection'))
  }

  handlePinChange = (e) => this.setState({selectedUserPassword: e.target.value});

  render() {
    return (
      <>
        <Row
          className="justify-content-around"
          style={{ marginTop: '3.75rem' }}
        >
          {this.state.users.map((u) => (
            <CardProfile
              key={u.id}
              img={u.gender === 'male' ? profileMalePic : profileFemalePic}
              gender={u.gender}
              label={u.user}
              email={u.email}
              handleClick={this.handleClick}
            />
          ))}
        </Row>
        {this.state.showModal && (
          <ModalLogin
            incorrectPassword={this.state.incorrectPassword}
            onChange={this.handlePinChange}
            img={this.state.selectedUserGender === 'male' ? profileMalePic : profileFemalePic}
            user={this.state.selectedUser}
            handleLogin={this.handleLogin}
            handleClose={this.handleClose}
          />
        )}
      </>
    );
  }
}

export default Home;
