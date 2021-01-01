import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

import Home from '../pages/HomePage';
import SelectionScreen from '../pages/SelectionPage';
import Inventory from '../pages/InventoryPage';
import { AppContext } from '../context/AppContext';
import { getRoute } from '../routeConfig';
import axios from 'axios';
import env from 'react-dotenv';
import Api from '../Api';

class App extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = { isReady: false, isLoggedIn: false, user: null, jwt: null };
  }

  componentDidMount() {
    this._isMounted = true;
    const jwt = localStorage.getItem('jwt');
    if (jwt) this.autoSignIn(jwt);
    else this.setState({ isReady: true });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  autoSignIn = (jwt) => {
    Api.getCurrentUser(jwt).then(
      ({ data: { user } }) => {
        this._isMounted &&
          this.setState({
            isReady: true,
            isLoggedIn: true,
            user: user,
            jwt: jwt,
          });
      },
      (err) => {
        this._isMounted &&
          this.setState({
            isReady: true,
          });
      }
    );
  }

  login = (user, jwt) => {
    this.setState({isLoggedIn: true, user: user, jwt: jwt });
    localStorage.setItem('jwt', jwt);
  };

  logout = () => {
    this.setState({isLoggedIn: false, user: null, jwt: null });
    localStorage.clear();
  }

  PrivateRoute = ({ children, ...rest }) => <Route {...rest} render={() => this.state.isLoggedIn ? children : <Redirect to="/"/>} />;

  render() {
    return this.state.isReady && (
      <AppContext.Provider
        value={{
          state: this.state,
          setState: this.setState,
          isLoggedIn: this.state.isLoggedIn,
          history: this.props.history,
          login: this.login,
          logout: this.logout,
        }}
      >
        <Router>
          <div className="vh-100 vw-100" style={{ backgroundColor: '#F2F2F2' }}>
            <Container fluid className="d-flex flex-column h-100">
              <Switch>
                <Route path={getRoute('home')} exact >
                  { !this.state.isLoggedIn ? <Home /> : <Redirect to={getRoute('selection')}/> }
                </Route>

                <this.PrivateRoute path={getRoute('selection')}>
                  <SelectionScreen/>
                </this.PrivateRoute>
                <this.PrivateRoute path={getRoute('inventory')}>
                  <Inventory/>
                </this.PrivateRoute>

                <Route path="*">
                  <p>Invalid link</p>
                </Route>
              </Switch>
            </Container>
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
