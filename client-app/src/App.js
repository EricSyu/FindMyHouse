import {React, useState, useEffect} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Navbar, Table } from 'react-bootstrap';

function App() {
    // eslint-disable-next-line no-unused-vars
    const [houses, setHouses] = useState([])
    
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
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#">House Viewer</Navbar.Brand>
        </Navbar>

        <div className="content">
            <Table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>title</th>
                </tr>
            </thead>
            <tbody>
                {
                    houses.map((h, i) => (
                        <tr key={i}>
                            <td>{h.id}</td>
                            <td>{h.title}</td>
                        </tr>
                    ))
                }
            </tbody>
            </Table>
        </div>

        </div>
    );
}

export default App;
