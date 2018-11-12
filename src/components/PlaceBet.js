import React from 'react';
import './css/PlaceBet.css';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';


class ValueSlider extends React.Component {

  onInputChange = (event) => {
    this.props.updateValue(Number(event.target.value));
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <input type="number" className="form-control" onChange={this.onInputChange} value={this.props.value} />
        </div>
        <div className="col-10">
          <Slider onChange={this.props.updateValue} value={this.props.value} />
        </div>
      </div>
    );
  }
}

class BetSize extends React.Component {

  render() {
    return (
      <div className="form-group">
        <label>Bet size</label>
        <ValueSlider value={this.props.betSize} updateValue={this.props.updateBetSize} />
      </div>
    );
  }
}

class ChanceOfWinning extends React.Component {

  render() {
    return (
      <div className="form-group">
        <label>Chance of winning</label>
        <ValueSlider value={this.props.chances} updateValue={this.props.updateChances} />
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
          <h3 className="roll-under-value">{this.props.value}</h3>
        </div>
      </div>
    );
  }
}

const Button = ({ text }) => (
    <button type="button" className="btn btn-primary btn-lg">{text}</button>
)

class RollButton extends React.Component {
  render() {
    return <Button text="Roll" />
  }
}

class PlaceBet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      betSize: 1,
      chances: 51,
    };
  }

  updateState = key => value => this.setState({ [key]: value })

  render() {
    return (
      <form className="PlaceBet">
        <h2>Place your bet</h2>
        <BetSize betSize={this.state.betSize} updateBetSize={this.updateState('betSize')} />
        <ChanceOfWinning chances={this.state.chances} updateChances={this.updateState('chances')} />
        <RollUnder value={this.state.chances} />
        <RollButton />
      </form>
    );
  }
}

export default PlaceBet;
