import React from 'react';
import './styles/myStyles.css'
import './App.css';

import Main from './scripts/Main';
import NavBar from './scripts/NavBar';
import Rosters from './scripts/Rosters';
import Players from './scripts/Players';
import Teams from './scripts/Teams';

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';



function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <div style={{ marginTop: "56px" }}>
          <Switch>
            <Route exact path="/" component={Main}/>
            <Route path={"/player"} component={Players}/>
            <Route path={"/teams"} component={Teams}/>
            <Route path={"/rosters"} component={Rosters}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}


export default App;
