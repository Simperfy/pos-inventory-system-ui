import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

import Home from '../pages/HomePage';
import SelectionScreen from '../pages/SelectionPage';
import Inventory from '../pages/InventoryPage';
import { AppContext } from '../context/AppContext';
import { getRoute } from '../routeConfig';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false, user: null, jwt: null };
  }

  login = (user, jwt) => this.setState({isLoggedIn: true, user: user, jwt: jwt });

  logout = () => this.setState({isLoggedIn: false, user: null, jwt: null });

  PrivateRoute = ({ children, ...rest }) => <Route {...rest} render={() => this.state.isLoggedIn ? children : <Redirect to="/"/>} />;

  render() {
    return (
      <AppContext.Provider
        value={{
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
                <Route path={getRoute('home')} exact component={Home} />

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
