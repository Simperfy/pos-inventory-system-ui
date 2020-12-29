import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import Home from '../../pages/Home';
import SelectionScreen from '../../pages/SelectionScreen';
import Inventory from '../../pages/Inventory';

function App() {
  return (
    <div className="vh-100 vw-100" style={{backgroundColor: "#F2F2F2"}}>
      <Container fluid className="d-flex flex-column h-100">
        {/* <Home /> */}
        {/* <SelectionScreen /> */}
        <Inventory />
      </Container>
    </div>
  );
}

export default App;
