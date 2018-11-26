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
  EtherollContract, Networks, contractAddresses,
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
      contract: null,
      contractAddress: contractAddresses[Networks.mainnet],
      // most recent transaction is last in the array
      allTransactions: [],
      filteredTransactions: [],
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
    contract.web3Contract.playerRollDice(rollUnder, { from: account, value }, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(JSON.stringify(result));
        // TODO: not an array of tx hash anymore
        // this.setState(prevState => ({
        //   allTransactions: prevState.allTransactions.concat(result),
        // }));
      }
    });
  }

  getTransactions(contract) {
    contract.getMergedTransactionLogs((error, result) => {
      if (error) {
        console.log(error);
      } else {
        // const allTransactions = result.map(item => item.transactionHash);
        // this.setState({ allTransactions });
        this.setState(prevState => ({
          allTransactions: prevState.allTransactions.concat(result),
          filteredTransactions: prevState.filteredTransactions.concat(result),
        }));
      }
    });
  }

  getWeb3() {
    getWeb3.then((results) => {
      const { web3 } = results;
      const contract = new EtherollContract(web3);
      const contractAddress = contract.address;
      this.getTransactions(contract);
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

  filterTransactions(transactionsFilter) {
    const { account, allTransactions } = this.state;
    let filteredTransactions = allTransactions.slice();
    if (transactionsFilter.endsWith('#my-transactions')) {
      filteredTransactions = allTransactions.filter(transaction => (
        transaction.logBetEvent.args.PlayerAddress.toLowerCase() === account.toLowerCase()
      ));
    }
    this.setState({ filteredTransactions });
  }

  updateState(key) {
    return (value) => {
      this.setState({ [key]: value });
    };
  }

  render() {
    const {
      account, alertDict, betSize, chances, contractAddress, filteredTransactions,
      network, web3,
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
        <Transactions
          network={network}
          onClick={transactionsFilter => this.filterTransactions(transactionsFilter)}
          transactions={filteredTransactions}
        />
      </div>
    );
  }
}

export default PlaceBet;
