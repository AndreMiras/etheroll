import React from 'react';
import './css/PlaceBet.css';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import getWeb3 from "../utils/get-web3";
import {getEtherollContractSync, etherscanUrls, Networks, contractAddresses} from "../utils/etheroll-contract";


function ValueSlider(props) {
  return (
    <div className="row">
      <div className="col-sm-3 col-lg-2">
        <input type="number" className="form-control"
            onChange={(e) => props.updateValue(Number(e.target.value))} value={props.value} />
      </div>
      <div className="col">
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
  const transactions = props.transactions.map((item, index) => (
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
      account: null,
      web3: null,
      network: Networks.mainnet,
      contract: contractAddresses[Networks.mainnet],
      rollTransactions: [],
    };
  }

  componentDidMount() {
    this.getWeb3();
  }

  onRollClick() {
    const {
      account, contract, betSize, web3,
    } = this.state;
    const value = web3.toWei(betSize.toString(), 'ether');
    contract.playerRollDice(51, { from: account, value }, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(JSON.stringify(result));
        this.setState(prevState => ({
          rollTransactions: prevState.rollTransactions.concat(result),
        }));
      }
    });
  }

  getWeb3() {
    getWeb3.then((results) => {
      const { web3 } = results;
      const contract = getEtherollContractSync(web3);
      this.setState({
        web3,
        network: web3.version.network,
        contract,
        contractAddress: contract.address,
      });
      web3.eth.getAccounts((error, accounts) => {
        if (error) {
          console.log(error);
        }
        this.setState({ account: accounts[0] });
      });
    });
  }

  updateState(key) {
    return (value) => {
      this.setState({ [key]: value });
    };
  }

  render() {
    const {
      account, betSize, chances, contractAddress, network, rollTransactions,
    } = this.state;
    const rollUnder = chances + 1;
    return (
      <div>
        <ContractInfo contractAddress={contractAddress} network={network} account={account} />
        <form className="PlaceBet">
          <h2>Place your bet</h2>
          <BetSize betSize={betSize} updateBetSize={this.updateState('betSize')} />
          <ChanceOfWinning chances={chances} updateChances={this.updateState('chances')} />
          <RollUnder value={rollUnder} />
          <RollButton onClick={() => this.onRollClick()} />
        </form>
        <Transactions network={network} transactions={rollTransactions} />
      </div>
    );
  }
}

export default PlaceBet;
