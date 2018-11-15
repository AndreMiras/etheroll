import React from 'react';
import './css/PlaceBet.css';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import getWeb3 from "../utils/get-web3";
import {getEtherollContractSync, etherscanUrls, Networks, contractAddresses} from "../utils/etheroll-contract";


function ValueSlider(props) {
  return (
    <div className="row">
      <div className="col">
        <input type="number" className="form-control"
            onChange={(e) => props.updateValue(Number(e.target.value))} value={props.value} />
      </div>
      <div className="col-10">
        <Slider onChange={props.updateValue} value={props.value} step={props.step} max={props.max} />
      </div>
    </div>
  );
}

function BetSize(props) {
  return (
    <div className="form-group">
      <label>Bet size</label>
      <ValueSlider value={props.betSize} updateValue={props.updateBetSize} step={0.1} max={10} />
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

function Transaction (props) {
  const url = etherscanUrls[props.network] + '/tx/' + props.hash;
  return <a href={url}>{props.hash}</a>
}

function Address (props) {
  const url = etherscanUrls[props.network] + '/address/' + props.address;
  return <a href={url}>{props.address}</a>
}

function Wallet (props) {
  return <span>Wallet: <Address network={props.network} address={props.address} /></span>
}

function Contract (props) {
  return <span>Contract: <Address network={props.network} address={props.address} /></span>
}

function ContractInfo (props) {
  return (
  <div className="row">
    <div className="col">
      <Contract network={props.network} address={props.contractAddress} />
    </div>
    <div className="col">
      <Wallet network={props.network} address={props.account} />
    </div>
  </div>
  );
}

function Transactions (props) {
  if (props.transactions.length === 0) return <span />;
  var transactions = props.transactions.map((item, index) => (
    <li key={index} className="list-group-item"><Transaction network={props.network} hash={item} /></li>
  ));
  return (
    <div className="card transactions">
      <div className="card-header">Transactions</div>
      <div className="card-body">
        <ul className="list-group">{transactions}</ul>
      </div>
    </div>
  );
}

class PlaceBet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      betSize: 0.1,
      chances: 50,
      accounts: null,
      account: null,
      web3: null,
      network: Networks.mainnet,
      contract: contractAddresses[Networks.mainnet],
      roll_transactions: [],
    };
  }

  componentDidMount() {
    this.getWeb3();
  }

  updateState = key => value => this.setState({ [key]: value })

  onRollClick() {
    var web3 = this.state.web3;
    var from_account = this.state.account;
    var valueEth = this.state.betSize;
    var value = web3.toWei(valueEth.toString(), "ether");
    this.state.contract.playerRollDice(51, {from: from_account, value: value}, (error, result) => {
      if (error) {
        console.error(error);
      }
      else {
        console.log(JSON.stringify(result));
        var roll_transactions = this.state.roll_transactions.slice();
        roll_transactions.push(result);
        this.setState({roll_transactions: roll_transactions});
      }
    });
  }

  getWeb3() {
    getWeb3.then(results => {
      var web3 = results.web3;
      var contract = getEtherollContractSync(web3);
      this.setState({
        web3: web3,
        network: web3.version.network,
        contract: contract,
        contractAddress: contract.address,
      });
      web3.eth.getAccounts((error, accounts) => {
        if (error) {
          console.log(error)
        }
        this.setState({accounts: accounts, account: accounts[0]});
      });
    });
  }

  render() {
    const rollUnder = this.state.chances + 1;
    return (
      <div>
        <ContractInfo contractAddress={this.state.contractAddress} network={this.state.network} account={this.state.account} />
        <form className="PlaceBet">
          <h2>Place your bet</h2>
          <BetSize betSize={this.state.betSize} updateBetSize={this.updateState('betSize')} />
          <ChanceOfWinning chances={this.state.chances} updateChances={this.updateState('chances')} />
          <RollUnder value={rollUnder} />
          <RollButton onClick={() => this.onRollClick()} />
        </form>
        <Transactions network={this.state.network} transactions={this.state.roll_transactions} />
      </div>
    );
  }
}

export default PlaceBet;
