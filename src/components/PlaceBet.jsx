import React from 'react';
import './css/PlaceBet.css';
import getWeb3 from '../utils/get-web3';
import ContractInfo from './ContractInfo';
import BetSize from './BetSize';
import ChanceOfWinning from './ChanceOfWinning';
import RollUnder from './RollUnder';
import RollButton from './RollButton';
import Transactions from './Transactions';
import {
  getEtherollContractSync, Networks, contractAddresses,
} from '../utils/etheroll-contract';

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

export default PlaceBet;
