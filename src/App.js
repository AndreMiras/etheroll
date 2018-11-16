import React from 'react';
import './App.css';
import Headers from './components/Headers';
import Footers from './components/Footers';
import PlaceBet from './components/PlaceBet';

function App() {
  return (
    <div className="App">
      <Headers />
      <div className="container">
        <PlaceBet />
      </div>
      <Footers />
    </div>
  );
}

export default App;
