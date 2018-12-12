import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Headers from './components/Headers';
import Footers from './components/Footers';
import PlaceBet from './components/PlaceBet';


const Hi = () => (
  <>
    Hello there sexy :)
  </>
);

const App = () => (
  <Router>
    <div className="App">
      <Headers />
      <div className="container">
        <Route path="/" exact component={PlaceBet} />
        <Route path="/toss" component={Hi} />
      </div>
      <Footers />
    </div>
  </Router>
);

export default App;
