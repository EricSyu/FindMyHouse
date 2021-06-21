/* eslint-disable react/jsx-key */
import { React, useState, useEffect, useMemo } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './App.css';

import { Navbar, Container, Row, Col } from 'react-bootstrap';
import { useTable } from 'react-table';

function App() {
    const [houses, setHouses] = useState([])
    const tableData = useMemo(() => houses, [houses]);
    const tableCols = useMemo(() => [
        {
            accessor: 'id',
            Header: 'id'
        }, 
        {
            accessor: 'title',
            Header: '標題'
        }, 
        {
            Header: '價格2'
        },
        {
            Header: '價格3'
        },
        {
            Header: '價格4'
        }
    ], []);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns: tableCols, data: tableData });
    
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
                            <div className="table-responsive text-nowrap">
                                <table className="table table-hover table-bordered" {...getTableProps()}>
                                    <thead>
                                        {
                                            headerGroups.map(headerGroup => (
                                                <tr {...headerGroup.getHeaderGroupProps()}>
                                                    {
                                                        headerGroup.headers.map(column => (
                                                            <th scope="col" {...column.getHeaderProps()}>
                                                                {column.render('Header')}
                                                            </th>
                                                        ))
                                                    }
                                                </tr>
                                            ))
                                        }
                                    </thead>
                                    <tbody {...getTableBodyProps()}>
                                        {
                                            rows.map(row => {
                                                prepareRow(row)
                                                return (
                                                    <tr {...row.getRowProps()}>
                                                        {
                                                            row.cells.map(cell => {
                                                                return (
                                                                    <td {...cell.getCellProps()}>
                                                                        {cell.render('Cell')}
                                                                    </td>
                                                                )
                                                            })
                                                        }
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default App;
