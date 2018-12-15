import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './App.css';
import Headers from './components/Headers';
import Footers from './components/Footers';
import Container from './components/Container';


const App = () => (
  <Router>
    <div className="App">
      <Headers />
      <Container />
      <Footers />
    </div>
  </Router>
);

export default App;
