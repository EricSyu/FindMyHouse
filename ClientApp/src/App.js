import { React } from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css';

import { HouseTable } from './HouseTable';

function App() {

  return (
    <div className="App">
      <div className="header">
        <Navbar bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand href="#home">House Viewer</Navbar.Brand>
          </Container>
        </Navbar>
      </div>
      <div className="content p-1">
        <Container fluid>
          <Row>
            <Col>
              <HouseTable />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
