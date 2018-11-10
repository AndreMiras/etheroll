import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();



class BetSize extends React.Component {
  render() {
    return (
    <div>
      <h3>Bet size</h3>
      <input className="bet-size">
      </input>
    </div>
    );
  }
}

class ChanceOfWinning extends React.Component {
  render() {
    return (
    <div>
      <h3>Chance of winning</h3>
      <input className="chane-of-winning">
      </input>
    </div>
    );
  }
}

class RollUnder extends React.Component {
  render() {
    return (
    <div>
      <h3>Roll under</h3>
      <span className="roll-under-value">{/* TODO */}</span>
    </div>
    );
  }
}

class RollButton extends React.Component {
  render() {
    return (
      <button className="roll-button">
        {/* TODO */}
      </button>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <BetSize />
        <ChanceOfWinning />
        <RollUnder />
      </div>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
