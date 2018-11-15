import React from 'react';
import './css/PlaceBet.css';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import getWeb3 from "../utils/get-web3";
import {getEtherollContractSync} from "../utils/etheroll-contract";


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
    return (
      <button type="button" className="btn btn-primary btn-lg" onClick={props.onClick}>
        {props.text}
      </button>
    );
}

function RollButton(props) {
  return <Button text="Roll" onClick={props.onClick} />
}

function Accounts (props) {
    return <p>Accounts: {props.accounts}</p>
}

class PlaceBet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      betSize: 1,
      chances: 50,
      accounts: null,
      web3: null,
    };
  }

  componentDidMount() {
    this.getWeb3();
  }

  updateState = key => value => this.setState({ [key]: value })

  onRollClick() {
    var web3 = this.state.web3;
    var etherollContract = getEtherollContractSync(web3);
    var from_account = this.state.accounts[0];
    var valueEth = this.state.betSize;
    var value = web3.toWei(valueEth.toString(), "ether");
    etherollContract.playerRollDice(51, {from: from_account, value: value}, (error, result) => {
      if (error) {
        console.error(error);
      }
      else {
        console.log(JSON.stringify(result));
      }
    });
  }

  getWeb3() {
    getWeb3.then(results => {
      var web3 = results.web3;
      this.setState({web3: web3});
      web3.eth.getAccounts((error, accounts) => {
        if (error) {
          console.log(error)
        }
        this.setState({accounts: accounts});
      });
    });
  }

  render() {
    const rollUnder = this.state.chances + 1;
    return (
      <form className="PlaceBet">
        <h2>Place your bet</h2>
        <Accounts accounts={this.state.accounts} />
        <BetSize betSize={this.state.betSize} updateBetSize={this.updateState('betSize')} />
        <ChanceOfWinning chances={this.state.chances} updateChances={this.updateState('chances')} />
        <RollUnder value={rollUnder} />
        <RollButton onClick={() => this.onRollClick()} />
      </form>
    );
  }
}

export default PlaceBet;
