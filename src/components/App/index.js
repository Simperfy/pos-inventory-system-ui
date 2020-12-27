import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import Home from '../../pages/Home';
import SelectionScreen from "../../pages/SelectionScreen";
import Inventory from "../../pages/Inventory";

function App() {
  return (
    <Container fluid>
      {/* <Home /> */}
      {/* <SelectionScreen /> */}
      <Inventory />
    </Container>
  );
}

export default App;
