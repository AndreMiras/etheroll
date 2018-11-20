import React from 'react';
import './css/PlaceBet.css';
import getWeb3 from '../utils/get-web3';
import Alert from './Alert';
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
      alertDict: {},
    };
  }

  componentDidMount() {
    this.getWeb3();
  }

  onRollClick() {
    const {
      account, chances, contract, betSize, web3,
    } = this.state;
    const rollUnder = chances + 1;
    const value = web3.toWei(betSize.toString(), 'ether');
    contract.playerRollDice(rollUnder, { from: account, value }, (error, result) => {
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

  getTransactions(web3, contractAddress) {
    // doesn't seem to work with account address
    // and doesn't seem to work with list of addresses either
    // const address = [account, contractAddress];
    const address = contractAddress;
    web3.eth.getBlockNumber((error, result) => {
      if (error) {
        console.log(error);
      }
      else {
        console.log(result);
        const lastBlock = result;
        const fromBlock = lastBlock - 100;
        const toBlock = lastBlock;
        const options = {
          address,
          fromBlock,
          toBlock,
        };
        const filter = web3.eth.filter(options);
        filter.watch((error, result) => {
          if (error) {
            console.log(error);
          }
          else {
            console.log(result);
            // const rollTransactions = result.map(item => item.transactionHash);
            // this.setState({ rollTransactions });
            this.setState(prevState => ({
              rollTransactions: prevState.rollTransactions.concat(result.transactionHash),
            }));
          }
        });
      }
    });
  }

  getWeb3() {
    getWeb3.then((results) => {
      const { web3 } = results;
      const contract = getEtherollContractSync(web3);
      const contractAddress = contract.address;
      this.getTransactions(web3, contractAddress);
      this.setState({
        web3,
        network: Number(web3.version.network),
        contract,
        contractAddress,
      });
      web3.eth.getAccounts((error, accounts) => {
        if (error) {
          console.log(error);
        }
        this.setState({ account: accounts[0] });
      });
    }, () => {
      const classType = 'danger';
      const message = 'No account connected, '
        + 'connect with a Web3-compatible wallet like MetaMask';
      const alertDict = { classType, message };
      this.setState({ alertDict });
    });
  }

  updateState(key) {
    return (value) => {
      this.setState({ [key]: value });
    };
  }

  render() {
    const {
      account, alertDict, betSize, chances, contractAddress, network, rollTransactions, web3,
    } = this.state;
    const rollUnder = chances + 1;
    const rollDisabled = web3 === null;
    return (
      <div>
        <Alert classType={alertDict.classType} message={alertDict.message} />
        <ContractInfo account={account} contractAddress={contractAddress} network={network} />
        <form className="PlaceBet">
          <h2>Place your bet</h2>
          <BetSize betSize={betSize} updateBetSize={this.updateState('betSize')} />
          <ChanceOfWinning chances={chances} updateChances={this.updateState('chances')} />
          <RollUnder value={rollUnder} />
          <RollButton isDisabled={rollDisabled} onClick={() => this.onRollClick()} />
        </form>
        <Transactions network={network} transactions={rollTransactions} />
      </div>
    );
  }
}

export default PlaceBet;
