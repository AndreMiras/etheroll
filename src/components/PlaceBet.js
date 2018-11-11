import React from 'react';
import './css/PlaceBet.css';


class BetSize extends React.Component {
  render() {
    return (
    <div className="form-group">
      <label>Bet size</label>
      <input className="bet-size form-control">
      </input>
    </div>
    );
  }
}

class ChanceOfWinning extends React.Component {
  render() {
    return (
    <div className="form-group">
      <label>Chance of winning</label>
      <input className="chane-of-winning form-control">
      </input>
    </div>
    );
  }
}

class RollUnder extends React.Component {
  render() {
    return (
    <div className="row">
      <div className="col">
        <h3>Roll under</h3>
      </div>
      <div className="col">
        <h3 className="roll-under-value">{/* TODO */}51</h3>
      </div>
    </div>
    );
  }
}

class RollButton extends React.Component {
  render() {
    return (
      <button type="button" className="roll-button btn btn-primary">Roll</button>
    );
  }
}

class PlaceBet extends React.Component {
  render() {
    return (
      <form className="PlaceBet">
        <h2>Place your bet</h2>
        <BetSize />
        <ChanceOfWinning />
        <RollUnder />
        <RollButton />
      </form>
    );
  }
}

export default PlaceBet;
