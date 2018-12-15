import React from 'react';
import PropTypes from 'prop-types';
import './css/PlaceBet.css';
import getWeb3 from '../utils/get-web3';
import ContractInfo from './ContractInfo';
import BetSize from './BetSize';
import ChanceOfWinning from './ChanceOfWinning';
import RollUnderInfo from './RollUnderInfo';
import RollButton from './RollButton';
import Transactions from './Transactions';
import MetaMaskLink from './MetaMaskLink';
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
      minChances: ChanceOfWinning.defaultProps.min,
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
    };
  }

  componentDidMount() {
    this.getWeb3();
  }

  componentWillUnmount() {
    clearInterval(this.getTransactionsIntervalId);
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
        }
      },
    );
  }

  getTransactions(contract) {
    contract.getMergedTransactionLogs((error, result) => {
      if (error) {
        console.log(error);
      } else {
        const allTransactions = result;
        this.setState({ allTransactions });
        this.filterTransactions(window.location.href);
      }
    });
  }

  getWeb3() {
    const { showMessage, showWarningMessage } = this.props;
    getWeb3.then((results) => {
      const { web3 } = results;
      const contract = new EtherollContract(web3);
      const contractAddress = contract.address;
      const pullIntervalSeconds = 10 * 1000;
      // clearInterval() is in the componentWillUnmount()
      this.getTransactionsIntervalId = setInterval((
      ) => this.getTransactions(contract), pullIntervalSeconds);
      this.getTransactions(contract);
      this.setState({
        web3,
        network: Number(web3.version.network),
        contract,
        contractAddress,
      });
      contract.web3Contract.minBet((error, minBetWei) => {
        if (error) {
          this.showFetchContractInfoWarning();
        } else {
          const minBet = web3.fromWei(minBetWei, 'ether').toNumber();
          this.setState({ minBet });
        }
      });
      contract.web3Contract.minNumber((error, minNumber) => {
        if (error) {
          this.showFetchContractInfoWarning();
        }
        const minChances = minNumber - 1;
        this.setState({ minChances });
      });
      contract.web3Contract.maxNumber((error, maxNumber) => {
        if (error) {
          this.showFetchContractInfoWarning();
        }
        const maxChances = maxNumber - 1;
        this.setState({ maxChances });
      });
      web3.eth.getBalance(contractAddress, (error, balance) => {
        // error can be null with the balance also null in rare cases
        if (error || balance === null) {
          const message = "Can't fetch contract balance.";
          this.showFetchContractInfoWarning(message);
        } else {
          const contractBalance = web3.fromWei(balance, 'ether').toNumber();
          this.setState({ contractBalance });
        }
      });
      web3.eth.getAccounts((error, accounts) => {
        if (error) {
          const message = "Can't retrieve accounts.";
          showWarningMessage(message);
        } else {
          const accountAddress = accounts.length === 0 ? null : accounts[0];
          if (accountAddress !== null) {
            web3.eth.getBalance(accountAddress, (err, balance) => {
              // error can be null with the balance also null in rare cases
              if (err || balance === null) {
                const message = "Can't fetch account balance.";
                showWarningMessage(message);
              } else {
                const accountBalance = web3.fromWei(balance, 'ether').toNumber();
                this.setState({ accountBalance });
              }
            });
          }
          this.setState({ accountAddress });
        }
      });
    }, () => {
      const classType = 'danger';
      const message = (<>
        {'No account connected, connect with a Web3-compatible wallet like '}
        <MetaMaskLink />
      </>);
      showMessage(classType, message);
    });
  }

  showFetchContractInfoWarning(optionalMessage) {
    const { showWarningMessage } = this.props;
    const defaultMessage = "Can't fetch contract info.";
    const message = (typeof optionalMessage === 'undefined') ? defaultMessage : optionalMessage;
    showWarningMessage(message);
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
      accountAddress, accountBalance, betSize, chances, contractAddress,
      contractBalance, filteredTransactions, minBet, maxBet, minChances, maxChances, network,
    } = this.state;
    const rollUnder = chances + 1;
    const rollDisabled = accountAddress === null;
    return (
      <div>
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
          <RollUnderInfo value={rollUnder} betSize={betSize} />
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
PlaceBet.propTypes = {
  showMessage: PropTypes.func.isRequired,
  showWarningMessage: PropTypes.func.isRequired,
};

export default PlaceBet;
