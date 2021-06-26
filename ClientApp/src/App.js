/* eslint-disable react/jsx-key */
import { React, useState, useEffect, useMemo } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Navbar, Container, Row, Col } from 'react-bootstrap';

function App() {
  const [houses, setHouses] = useState([])

  async function fetchHouseData() {
      let response = await fetch("api/House");
      let jsonData = await response.json();
      setHouses(jsonData);
  }

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
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
