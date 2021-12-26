import { React, useState, useEffect } from 'react';
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
              <Navbar.Brand href="/">Find My House</Navbar.Brand>
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
  const [searchedHouses, setSearchedHouses] = useState([]);
  const [favoriteHouses, setFavoriteHouses] = useState([]);
  const [trashHouses, setTrashHouses] = useState([]);
  const [refreshKey, setRefreshKey] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let response = await fetch("/api/House");
      let data = await response.json();
      
      let searchedData = data.filter((item, index, array) => item.favoriteRanking === -1);
      let favoriteData = data.filter((item, index, array) => item.favoriteRanking > 0);
      let trashData = data.filter((item, index, array) => item.favoriteRanking === -2);
      
      setSearchedHouses(searchedData);
      setFavoriteHouses(favoriteData);
      setTrashHouses(trashData);
      setLoading(false);
    }

    fetchData();
  }, [refreshKey]);

  function refresh() {
    setRefreshKey(oldKey => !oldKey);
  }  

  return (
    <Tabs defaultActiveKey="searched" className="mb-3 nav-fill home-tabs">
      <Tab eventKey="searched" title="房屋清單">
        <HouseTable houses={searchedHouses} mode={'searched'} refresh={refresh} loading={loading} setLoading={(e) => setLoading(e)} />
      </Tab>
      <Tab eventKey="favorite" title="喜愛清單">
        <HouseTable houses={favoriteHouses} mode={'favorite'} refresh={refresh} loading={loading} setLoading={(e) => setLoading(e)} />
      </Tab>
      <Tab eventKey="trash" title="垃圾桶">
        <HouseTable houses={trashHouses} mode={'trash'} refresh={refresh} loading={loading} setLoading={(e) => setLoading(e)} />
      </Tab>
    </Tabs>
  );
}

export default App;
