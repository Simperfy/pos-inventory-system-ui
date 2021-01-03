import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { HomePage, InventoryPage, SelectionPage, SalesPage } from './pages';
import { AppContext } from './context/AppContext';
import { getRoute } from './routeConfig';
import Api from './api/Api';
import env from 'react-dotenv';

class App extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isLoggedIn: false,
      user: null,
      jwt: null,
      isDisconnected: false
    };

    this.style = {
      noInternetDiv: {backgroundColor: '#ff8100', width: '100vw', position: 'fixed'},
      noInternetP: {textAlign: 'center', fontSize: '1.5rem', color: 'white', margin: 'auto'}
    }

  }

  componentDidMount() {
    this._isMounted = true;
    const jwt = localStorage.getItem('jwt');
    if (jwt) this.autoSignIn(jwt);
    else this.setState({ isReady: true });

    // @TODO: Don't remove, useful if server is in the cloud
    // Handle internet disconnection
    /*this.handleConnectionChange();
    window.addEventListener('online', this.handleConnectionChange);
    window.addEventListener('offline', this.handleConnectionChange);*/

    if (!env.APP_ENV) {
      if (env.APP_ENV === 'development') return;
      console.log('pinging')
      console.log(env.APP_ENV);
      this.handleLocalServerConnectionPings();
    }
  }

  handleLocalServerConnectionPings = () => {
    this.serverPing = setInterval(() => {
      fetch(env.API_URL)
          .then(() => this.setState({isDisconnected: false}))
          .catch(() => this.setState({isDisconnected: true}))
    }, 3000);
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.serverPing);

    // @TODO: Don't remove, useful if server is in the cloud
    // Handle internet disconnection
    /*window.removeEventListener('online', this.handleConnectionChange);
    window.removeEventListener('offline', this.handleConnectionChange);*/
  }

  // @TODO: Don't remove, useful if server is in the cloud
  /* handleConnectionChange = () => {
    const condition = navigator.onLine ? 'online' : 'offline';
    if (condition === 'online') {
      const webPing = setInterval(
          () => {
            fetch('//google.com', {
              mode: 'no-cors',
            })
                .then(() => {
                  this.setState({ isDisconnected: false }, () => {
                    return clearInterval(webPing)
                  });
                }).catch(() => this.setState({ isDisconnected: true }) )
          }, 2000);
      return;
    }

    return this.setState({ isDisconnected: true });
  }*/

  autoSignIn = (jwt) => {
    Api.getCurrentUser(jwt).then(
      ({ data }) => {
        this._isMounted &&
          this.setState({
            isReady: true,
            isLoggedIn: true,
            user: data,
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
              { this.state.isDisconnected && (
              <div style={this.style.noInternetDiv}>
                <p style={this.style.noInternetP}>Server connection lost</p>
              </div>)
              }
            <Container fluid className="d-flex flex-column h-100">
              <Switch>
                <Route path={getRoute('home')} exact >
                  { !this.state.isLoggedIn ? <HomePage /> : <Redirect to={getRoute('selection')}/> }
                </Route>

                <this.PrivateRoute path={getRoute('selection')}>
                  <SelectionPage/>
                </this.PrivateRoute>
                <this.PrivateRoute path={getRoute('inventory')}>
                  <InventoryPage/>
                </this.PrivateRoute>
                <this.PrivateRoute path={getRoute('sales')}>
                  <SalesPage/>
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
