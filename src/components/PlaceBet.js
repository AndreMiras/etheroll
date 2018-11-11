import React from 'react';
import './css/PlaceBet.css';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';


class BetSize extends React.Component {
  render() {
    return (
    <div className="form-group">
      <label>Bet size</label>
      <div className="row">
        <div className="col">
          <input className="bet-size form-control" />
        </div>
        <div className="col-11">
          <Slider />
        </div>
      </div>
    </div>
    );
  }
}

class ChanceOfWinning extends React.Component {
  render() {
    return (
    <div className="form-group">
      <label>Chance of winning</label>
      <div className="row">
        <div className="col">
          <input className="chane-of-winning form-control" />
        </div>
        <div className="col-11">
          <Slider />
        </div>
      </div>
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
      <button type="button" className="btn btn-primary btn-lg">Roll</button>
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
