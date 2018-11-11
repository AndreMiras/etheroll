import React from 'react';


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
      <button className="roll-button">Roll</button>
    );
  }
}

class PlaceBet extends React.Component {
  render() {
    return (
      <div>
        <BetSize />
        <ChanceOfWinning />
        <RollUnder />
        <RollButton />
      </div>
    );
  }
}

export default PlaceBet;
