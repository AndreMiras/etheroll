import React from 'react';
import './css/PlaceBet.css';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import PropTypes from 'prop-types';
import getWeb3 from '../utils/get-web3';
import {
  getEtherollContractSync, etherscanUrls, Networks, contractAddresses,
} from '../utils/etheroll-contract';


function ValueSlider({
  value, updateValue, step, max,
}) {
  return (
    <div className="row">
      <div className="col-sm-3 col-lg-2">
        <input
          type="number"
          className="form-control"
          onChange={e => updateValue(Number(e.target.value))}
          value={value}
        />
      </div>
      <div className="col">
        <Slider onChange={updateValue} value={value} step={step} max={max} />
      </div>
    </div>
  );
}
ValueSlider.propTypes = {
  value: PropTypes.number.isRequired,
  updateValue: PropTypes.func.isRequired,
  step: PropTypes.number,
  max: PropTypes.number,
};
ValueSlider.defaultProps = {
  step: 1,
  max: 100,
};

function BetSize({ betSize, updateBetSize }) {
  return (
    <div className="form-group">
      <b>Bet size</b>
      <ValueSlider value={betSize} updateValue={updateBetSize} step={0.1} max={10} />
    </div>
  );
}
BetSize.propTypes = {
  betSize: PropTypes.number.isRequired,
  updateBetSize: PropTypes.func.isRequired,
};

function ChanceOfWinning({ chances, updateChances }) {
  return (
    <div className="form-group">
      <b>Chance of winning</b>
      <ValueSlider value={chances} updateValue={updateChances} />
    </div>
  );
}
ChanceOfWinning.propTypes = {
  chances: PropTypes.number.isRequired,
  updateChances: PropTypes.func.isRequired,
};

function RollUnder({ value }) {
  return (
    <div className="row">
      <div className="col">
        <h3>Roll under</h3>
      </div>
      <div className="col">
        <h3 className="roll-under-value">{value}</h3>
      </div>
    </div>
  );
}
RollUnder.propTypes = {
  value: PropTypes.number.isRequired,
};

function Button({ onClick, text }) {
  return (
    <button type="button" className="btn btn-primary btn-lg" onClick={onClick}>
      {text}
    </button>
  );
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

function RollButton({ onClick }) {
  return <Button text="Roll" onClick={onClick} />;
}
RollButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function Transaction({ hash, network }) {
  const url = `${etherscanUrls[network]}/tx/${hash}`;
  return <a href={url}>{hash}</a>;
}
Transaction.propTypes = {
  hash: PropTypes.string.isRequired,
  network: PropTypes.number.isRequired,
};

function Address({ address, network }) {
  const url = `${etherscanUrls[network]}/address/${address}`;
  return <a href={url}>{address}</a>;
}
Address.propTypes = {
  address: PropTypes.string.isRequired,
  network: PropTypes.number.isRequired,
};

function Wallet({ address, network }) {
  return (
    <span>
      Wallet:
      <Address address={address} network={network} />
    </span>
  );
}
Wallet.propTypes = Address.propTypes;

function Contract({ address, network }) {
  return (
    <span>
      Contract:
      <Address address={address} network={network} />
    </span>
  );
}
Contract.propTypes = Address.propTypes;

function ContractInfo({ account, contractAddress, network }) {
  if (account === null) {
    return <span>No account connected, connect with MetaMask.</span>;
  }
  return (
    <div className="row">
      <div className="col">
        <Contract network={network} address={contractAddress} />
      </div>
      <div className="col">
        <Wallet network={network} address={account} />
      </div>
    </div>
  );
}
ContractInfo.propTypes = {
  account: PropTypes.string,
  contractAddress: PropTypes.string.isRequired,
  network: PropTypes.number.isRequired,
};
ContractInfo.defaultProps = {
  account: null,
};

function Transactions({ network, transactions }) {
  if (transactions.length === 0) return <span />;
  const transactionsElems = transactions.map(item => (
    <li key={item} className="list-group-item"><Transaction network={network} hash={item} /></li>
  ));
  return (
    <div className="card transactions">
      <div className="card-header">Transactions</div>
      <div className="card-body">
        <ul className="list-group">{transactionsElems}</ul>
      </div>
    </div>
  );
}
Transactions.propTypes = {
  network: PropTypes.number.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

class PlaceBet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      betSize: 0.1,
      chances: 50,
      account: null,
      web3: null,
      network: Networks.mainnet,
      contractAddress: contractAddresses[Networks.mainnet],
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
        network: Number(web3.version.network),
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
        <ContractInfo account={account} contractAddress={contractAddress} network={network} />
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

export { Address, PlaceBet };
