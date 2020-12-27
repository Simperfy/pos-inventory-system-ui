import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import Home from '../../pages/Home';
import SelectionScreen from "../../pages/SelectionScreen";

function App() {
  return (
    <Container fluid>
      {/* <Home /> */}
      <SelectionScreen />
    </Container>
  );
}

export default App;
