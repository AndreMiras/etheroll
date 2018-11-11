import React from 'react';
import './css/PlaceBet.css';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';


class ValueSlider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  onInputChange = (event) => {
    this.setState({value: Number(event.target.value)});
  }

  onSliderChange = (value) => {
    console.log(value);
    this.setState({value});
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <input type="number" className="form-control" onChange={this.onInputChange} value={this.state.value} />
        </div>
        <div className="col-10">
          <Slider onChange={this.onSliderChange} value={this.state.value} />
        </div>
      </div>
    );
  }
}

class BetSize extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  render() {
    return (
    <div className="form-group">
      <label>Bet size</label>
      <ValueSlider value={this.state.value} />
    </div>
    );
  }
}

class ChanceOfWinning extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  render() {
    return (
    <div className="form-group">
      <label>Chance of winning</label>
      <ValueSlider value={this.state.value} />
    </div>
    );
  }
}

class RollUnder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  render() {
    return (
    <div className="row">
      <div className="col">
        <h3>Roll under</h3>
      </div>
      <div className="col">
        <h3 className="roll-under-value">{this.state.value}</h3>
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
        <BetSize value={1} mon={0} max={10} />
        <ChanceOfWinning value={50} min={1} max={100} />
        <RollUnder value="51" />
        <RollButton />
      </form>
    );
  }
}

export default PlaceBet;
