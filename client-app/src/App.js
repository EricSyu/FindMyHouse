import {React, useState, useEffect} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './App.css';

import { Navbar, Table } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';

function App() {
    const [houses, setHouses] = useState([])
    const columns = [{
        dataField: 'id',
        text: 'id'
      }, {
        dataField: 'title',
        text: '標題'
      }, {
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
                    <Navbar.Brand href="#">House Viewer</Navbar.Brand>
                </Navbar>
            </div>

            <div className="content">
                <BootstrapTable keyField='id' data={houses} columns={columns} />
            </div>

        </div>
    );
}

export default App;
