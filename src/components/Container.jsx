import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { fromWei } from 'web3-utils';
import Alert from './Alert';
import CoinFlip from './CoinFlip';
import ContractInfo from './ContractInfo';
import RollUnder from './RollUnder';
import BetSize from './BetSize';
import ChanceOfWinning from './ChanceOfWinning';
import MetaMaskLink from './MetaMaskLink';
import getWeb3 from '../utils/get-web3';
import {
  EtherollContract, Networks, contractAddresses,
} from '../utils/etheroll-contract';


const showMessage = (classType, message, updateAlertDict) => {
  const alertDict = { classType, message };
  updateAlertDict(alertDict);
};

const showFetchContractInfoWarning = (showWarningMessage, optionalMessage) => {
  const defaultMessage = "Can't fetch contract info.";
  const message = (typeof optionalMessage === 'undefined') ? defaultMessage : optionalMessage;
  showWarningMessage(message);
};

const minBetCallback = (showWarningMessage, updateValue) => (error, minBetWei) => {
  error ? showFetchContractInfoWarning(showWarningMessage) : (
    updateValue(Number(fromWei(minBetWei, 'ether')))
  );
};

const minNumberCallback = (showWarningMessage, updateValue) => (error, minNumber) => {
  error ? showFetchContractInfoWarning(showWarningMessage) : updateValue(minNumber - 1);
};

const maxNumberCallback = (showWarningMessage, updateValue) => (error, maxNumber) => {
  error ? showFetchContractInfoWarning(showWarningMessage) : updateValue(maxNumber - 1);
};

const getBalanceCallback = (showWarningMessage, updateValue) => (error, balance) => {
  // error can be null with the balance also null in rare cases
  (error || balance === null) ? showFetchContractInfoWarning("Can't fetch contract balance.") : (
    updateValue(Number(fromWei(balance, 'ether')))
  );
};

const getAccountBalanceCallback = (showWarningMessage, updateValue) => (error, balance) => {
  // error can be null with the balance also null in rare cases
  (error || balance === null) ? showWarningMessage("Can't fetch account balance.") : (
    updateValue(Number(fromWei(balance, 'ether')))
  );
};

const getAccountsCallback = (
  web3, showWarningMessage, updateAccountAddress, updateAccountBalance,
) => (error, accounts) => {
  if (error) {
    const message = "Can't retrieve accounts.";
    showWarningMessage(message);
  } else {
    const accountAddress = accounts.length === 0 ? null : accounts[0];
    if (accountAddress !== null) {
      web3.eth.getBalance(
        accountAddress,
        getAccountBalanceCallback(
          showWarningMessage,
          updateAccountBalance,
        ),
      );
    }
    updateAccountAddress(accountAddress);
  }
};

const filterTransactions = (
  accountAddress, transactionsFilter, allTransactions,
  updateFilteredTransactions, updateTransactionsFilter,
) => {
  let filteredTransactions = allTransactions.slice();
  if (transactionsFilter === '#my-transactions') {
    filteredTransactions = allTransactions.filter(transaction => (
      transaction.logBetEvent.returnValues.PlayerAddress.toLowerCase()
      === accountAddress.toLowerCase()
    ));
  }
  updateFilteredTransactions(filteredTransactions);
  updateTransactionsFilter(transactionsFilter);
};

const getTransactions = (
  contract, accountAddress, transactionsFilter,
  updateAllTransactions, updateFilteredTransactions, updateTransactionsFilter,
) => {
  contract.getMergedTransactionLogs((error, result) => {
    if (error) {
      console.log(error);
    } else {
      const allTransactions = result;
      updateAllTransactions(allTransactions);
      filterTransactions(
        accountAddress, transactionsFilter, allTransactions,
        updateFilteredTransactions, updateTransactionsFilter,
      );
    }
  });
};

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertDict: {},
      betSize: 0.1,
      chances: 50,
      minBet: BetSize.defaultProps.min,
      maxBet: BetSize.defaultProps.max,
      minChances: ChanceOfWinning.defaultProps.min,
      maxChances: ChanceOfWinning.defaultProps.max,
      accountAddress: null,
      accountBalance: 0,
      network: Networks.mainnet,
      contract: null,
      contractAddress: contractAddresses[Networks.mainnet],
      contractBalance: 0,
      // most recent transaction is last in the array
      allTransactions: [],
      filteredTransactions: [],
      transactionsFilter: '#all-transactions',
    };
    this.onWeb3 = this.onWeb3.bind(this);
    this.updateState = this.updateState.bind(this);
    this.initWeb3();
  }

  componentWillUnmount() {
    clearInterval(this.getTransactionsIntervalId);
  }

  /**
   * Retrieves web3 and contract info, then sets the following states:
   * - accountAddress
   * - accountBalance
   * - contract
   * - contractAddress
   * - contractBalance
   * - minBet
   * - maxBet (TODO)
   * - maxChances
   * - network
   */
  onWeb3(web3) {
    const getIdCallback = (network) => {
      const contractAddress = contractAddresses[network];
      const contract = new EtherollContract(web3, contractAddress);
      const pullIntervalSeconds = 10 * 1000;
      const { showWarningMessage, updateState } = this;
      const { transactionsFilter, accountAddress } = this.state;
      const getTransactionsAlias = () => getTransactions(
        contract, accountAddress, transactionsFilter,
        updateState('allTransactions'), updateState('filteredTransactions'), updateState('transactionsFilter'),
      );
      // clearInterval() is in the componentWillUnmount()
      this.getTransactionsIntervalId = setInterval(
        () => getTransactionsAlias(), pullIntervalSeconds,
      );
      getTransactionsAlias();
      this.setState({
        network,
        contract,
        contractAddress,
      });
      contract.web3Contract.methods.minBet().call(
        minBetCallback(
          showWarningMessage, updateState('minBet'),
        ),
      );
      contract.web3Contract.methods.minNumber().call(
        minNumberCallback(
          showWarningMessage, updateState('minChances'),
        ),
      );
      contract.web3Contract.methods.maxNumber().call(
        maxNumberCallback(
          showWarningMessage, updateState('maxChances'),
        ),
      );
      web3.eth.getBalance(
        contractAddress,
        getBalanceCallback(
          showWarningMessage, updateState('contractBalance'),
        ),
      );
      web3.eth.getAccounts(
        getAccountsCallback(
          web3, showWarningMessage, updateState('accountAddress'), updateState('accountBalance'),
        ),
      );
    };
    web3.eth.net.getId().then(getIdCallback);
  }

  initWeb3() {
    const getWeb3CallbackOk = ({ web3 }) => {
      this.onWeb3(web3);
    };
    const getWeb3CallbackError = () => {
      const classType = 'danger';
      const message = (
        <Fragment>
          {'No account connected, connect with a Web3-compatible wallet like '}
          <MetaMaskLink />
        </Fragment>
      );
      showMessage(classType, message, this.updateState('alertDict'));
    };
    getWeb3.then(getWeb3CallbackOk, getWeb3CallbackError);
  }

  showWarningMessage(message) {
    const classType = 'warning';
    showMessage(classType, message, this.updateState('alertDict'));
  }

  updateState(key) {
    return (value) => {
      this.setState({ [key]: value });
    };
  }

  render() {
    const {
      alertDict, accountAddress, accountBalance, allTransactions, betSize, chances, contract,
      contractAddress, contractBalance, filteredTransactions, maxBet, minBet, maxChances,
      minChances, network, transactionsFilter,
    } = this.state;

    const gameProps = {
      accountAddress,
      betSize,
      chances,
      contract,
      filteredTransactions,
      transactionsFilter,
      maxBet,
      minBet,
      maxChances,
      minChances,
      network,
      updateState: this.updateState,
      filterTransactions: filter => filterTransactions(
        accountAddress, filter, allTransactions,
        this.updateState('filteredTransactions'), this.updateState('transactionsFilter'),
      ),
    };
    const contractProps = {
      accountAddress, accountBalance, contractAddress, contractBalance, network,
    };

    return (
      <div className="container">
        <Alert classType={alertDict.classType} message={alertDict.message} />
        <ContractInfo {...contractProps} />
        <Route path="/" exact render={() => <RollUnder {...gameProps} />} />
        <Route path="/coin-flip" render={() => <CoinFlip {...gameProps} />} />
      </div>
    );
  }
}

export default Container;
