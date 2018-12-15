import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Headers from './components/Headers';
import Footers from './components/Footers';
import CoinFlip from './components/CoinFlip';
import PlaceBet from './components/PlaceBet';


const App = () => (
  <Router>
    <div className="App">
      <Headers />
      <div className="container">
        <Route path="/" exact component={PlaceBet} />
        <Route path="/coin-flip" component={CoinFlip} />
      </div>
      <Footers />
    </div>
  </Router>
);

export default App;
