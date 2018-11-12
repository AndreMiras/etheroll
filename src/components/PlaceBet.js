import React from 'react';
import './css/PlaceBet.css';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';


function ValueSlider(props) {
  return (
    <div className="row">
      <div className="col">
        <input type="number" className="form-control"
            onChange={(e) => props.updateValue(Number(e.target.value))} value={props.value} />
      </div>
      <div className="col-10">
        <Slider onChange={props.updateValue} value={props.value} />
      </div>
    </div>
  );
}

function BetSize(props) {
  return (
    <div className="form-group">
      <label>Bet size</label>
      <ValueSlider value={props.betSize} updateValue={props.updateBetSize} />
    </div>
  );
}

function ChanceOfWinning(props) {
  return (
    <div className="form-group">
      <label>Chance of winning</label>
      <ValueSlider value={props.chances} updateValue={props.updateChances} />
    </div>
  );
}

function RollUnder(props) {
  return (
    <div className="row">
      <div className="col">
        <h3>Roll under</h3>
      </div>
      <div className="col">
        <h3 className="roll-under-value">{props.value}</h3>
      </div>
    </div>
  );
}

// const Button = ({ text }) => (
//     <button type="button" className="btn btn-primary btn-lg">{text}</button>
// )

function Button(props) {
    return <button type="button" className="btn btn-primary btn-lg">{props.text}</button>
}

function RollButton() {
  return <Button text="Roll" />
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
