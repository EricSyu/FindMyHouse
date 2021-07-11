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
  const [houses, setHouses] = useState([]);
  const [favoriteHouses, setFavoriteHouses] = useState([]);
  const [trashHouses, setTrashHouses] = useState([]);
  const [refreshKey, setRefreshKey] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("/api/House");
      let data = await response.json();
      console.log(data);
      let housesData = data.filter((item, index, array) => item.favoriteRanking === -1);
      let favoriteData = data.filter((item, index, array) => item.favoriteRanking > 0);
      let trashData = data.filter((item, index, array) => item.favoriteRanking === -2);
      
      setHouses(housesData);
      setFavoriteHouses(favoriteData);
      setTrashHouses(trashData);
    }

    fetchData();
  }, [refreshKey]);

  function refresh() {
    setRefreshKey(oldKey => !oldKey);
  }  

  return (
    <Tabs defaultActiveKey="list" className="mb-3 nav-fill home-tabs">
      <Tab eventKey="list" title="房屋清單">
        <HouseTable houses={houses} displayRankingCol={false} refresh={refresh} />
      </Tab>
      <Tab eventKey="favorite" title="喜愛清單">
        <HouseTable houses={favoriteHouses} displayRankingCol={true} refresh={refresh} />
      </Tab>
      <Tab eventKey="trash" title="垃圾桶">
        <HouseTable houses={trashHouses} displayRankingCol={false} refresh={refresh} />
      </Tab>
    </Tabs>
  );
}

export default App;
