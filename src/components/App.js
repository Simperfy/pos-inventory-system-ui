import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Home from '../pages/HomePage';
import SelectionScreen from '../pages/SelectionPage';
import Inventory from '../pages/InventoryPage';
import { AppContext } from '../context/AppContext';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  render() {
    return (
      <AppContext.Provider value={{ isLoggedIn: this.state.isLoggedIn, history: this.props.history }}>
        <Router>
          <div className="vh-100 vw-100" style={{ backgroundColor: '#F2F2F2' }}>
            <Container fluid className="d-flex flex-column h-100">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/selection" component={SelectionScreen} />
                <Route path="/inventory" component={Inventory} />

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
