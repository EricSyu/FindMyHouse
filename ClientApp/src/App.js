import { React } from 'react';
import { Navbar, Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import { HouseTable } from './HouseTable';

function App() {

  return (
    <Router>
      <div className="App">
        <div className="header">
          <Navbar bg="dark" variant="dark">
            <Container fluid>
              <Navbar.Brand href="/">House Viewer</Navbar.Brand>
            </Container>
          </Navbar>
        </div>
        
        <Switch>
            <Route path="/">
              <Home />
            </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <Container fluid className="mt-1">
      <Row>
        <Col>
          <Tabs defaultActiveKey="list" className="mb-3 nav-fill">
            <Tab eventKey="list" title="房屋清單">
              <Container fluid>
                <Row>
                  <Col>
                    <HouseTable />
                  </Col>
                </Row>
              </Container>
            </Tab>
            <Tab eventKey="favorite" title="喜愛清單">
              <h2>favorite</h2>
            </Tab>
            <Tab eventKey="trash" title="垃圾桶">
              <h2>trash</h2>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
