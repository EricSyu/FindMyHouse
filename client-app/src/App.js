import {React, useState, useEffect} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './App.css';

import { Navbar, Container, Row, Col } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';

function App() {
    const [houses, setHouses] = useState([])
    const columns = [
        {
            dataField: 'id',
            text: 'id'
        }, 
        {
            dataField: 'title',
            text: '標題'
        }, 
        {
            dataField: 'price',
            text: '價格'
        }];
    
    useEffect(() => {
        fetchHouseData();
    }, []);

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
                            <BootstrapTable keyField='id' data={houses} columns={columns} wrapperClasses="table-responsive"/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default App;
