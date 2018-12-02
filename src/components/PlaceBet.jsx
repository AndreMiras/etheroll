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
      minBet: BetSize.defaultProps.min,
      maxBet: BetSize.defaultProps.max,
      minChances: ChanceOfWinning.defaultProps.max,
      maxChances: ChanceOfWinning.defaultProps.max,
      accountAddress: null,
      accountBalance: 0,
      web3: null,
      network: Networks.mainnet,
      contract: null,
      contractAddress: contractAddresses[Networks.mainnet],
      contractBalance: 0,
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
      accountAddress, chances, contract, betSize, web3,
    } = this.state;
    const rollUnder = chances + 1;
    const value = web3.toWei(betSize.toString(), 'ether');
    contract.web3Contract.playerRollDice(
      rollUnder, { from: accountAddress, value },
      (error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.log(JSON.stringify(result));
          // TODO: not an array of tx hash anymore
          // this.setState(prevState => ({
          //   allTransactions: prevState.allTransactions.concat(result),
          // }));
        }
      },
    );
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
      contract.web3Contract.minBet((error, minBetWei) => {
        if (error) {
          console.log(error);
        }
        const minBet = web3.fromWei(minBetWei, 'ether').toNumber();
        this.setState({ minBet });
      });
      contract.web3Contract.minNumber((error, minNumber) => {
        if (error) {
          console.log(error);
        }
        const minChances = minNumber - 1;
        this.setState({ minChances });
      });
      contract.web3Contract.maxNumber((error, maxNumber) => {
        if (error) {
          console.log(error);
        }
        const maxChances = maxNumber - 1;
        this.setState({ maxChances });
      });
      web3.eth.getBalance(contractAddress, (error, balance) => {
        if (error) {
          console.log(error);
        }
        const contractBalance = web3.fromWei(balance, 'ether').toNumber();
        this.setState({ contractBalance });
      });
      web3.eth.getAccounts((error, accounts) => {
        if (error) {
          console.log(error);
        }
        const accountAddress = accounts.length === 0 ? null : accounts[0];
        web3.eth.getBalance(accountAddress, (_, balance) => {
          const accountBalance = web3.fromWei(balance, 'ether').toNumber();
          this.setState({ accountBalance });
        });
        this.setState({ accountAddress });
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
    const { accountAddress, allTransactions } = this.state;
    let filteredTransactions = allTransactions.slice();
    if (transactionsFilter.endsWith('#my-transactions')) {
      filteredTransactions = allTransactions.filter(transaction => (
        transaction.logBetEvent.args.PlayerAddress.toLowerCase() === accountAddress.toLowerCase()
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
      accountAddress, accountBalance, alertDict, betSize, chances, contractAddress,
      contractBalance, filteredTransactions, minBet, maxBet, minChances, maxChances, network,
    } = this.state;
    const rollUnder = chances + 1;
    const rollDisabled = accountAddress === null;
    return (
      <div>
        <Alert classType={alertDict.classType} message={alertDict.message} />
        <ContractInfo
          accountAddress={accountAddress}
          accountBalance={accountBalance}
          contractAddress={contractAddress}
          contractBalance={contractBalance}
          network={network}
        />
        <form className="PlaceBet">
          <h2>Place your bet</h2>
          <BetSize betSize={betSize} min={minBet} max={maxBet} updateBetSize={this.updateState('betSize')} />
          <ChanceOfWinning chances={chances} min={minChances} max={maxChances} updateChances={this.updateState('chances')} />
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
