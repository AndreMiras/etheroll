import React, { Fragment } from 'react';
import { func } from 'prop-types';

import MetaMaskLink from './MetaMaskLink';
import getWeb3 from '../utils/get-web3';
import { EtherollContract, contractAddresses } from '../utils/etheroll-contract';


const showFetchContractInfoWarning = (showWarningMessage, optionalMessage) => {
  const defaultMessage = "Can't fetch contract info.";
  const message = (typeof optionalMessage === 'undefined') ? defaultMessage : optionalMessage;
  showWarningMessage(message);
};

const minBetCallback = (web3, showWarningMessage, updateValue) => (error, minBetWei) => {
  error ? showFetchContractInfoWarning(showWarningMessage) : (
    updateValue(Number(web3.utils.fromWei(minBetWei, 'ether')))
  );
};

const minNumberCallback = (showWarningMessage, updateValue) => (error, minNumber) => {
  error ? showFetchContractInfoWarning(showWarningMessage) : updateValue(minNumber - 1);
};

const maxNumberCallback = (showWarningMessage, updateValue) => (error, maxNumber) => {
  error ? showFetchContractInfoWarning(showWarningMessage) : updateValue(maxNumber - 1);
};

const getBalanceCallback = (web3, showWarningMessage, updateValue) => (error, balance) => {
  // error can be null with the balance also null in rare cases
  (error || balance === null) ? showFetchContractInfoWarning("Can't fetch contract balance.") : (
    updateValue(Number(web3.utils.fromWei(balance, 'ether')))
  );
};

const getAccountBalanceCallback = (web3, showWarningMessage, updateValue) => (error, balance) => {
  // error can be null with the balance also null in rare cases
  (error || balance === null) ? showWarningMessage("Can't fetch account balance.") : (
    updateValue(Number(web3.utils.fromWei(balance, 'ether')))
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
          web3,
          showWarningMessage,
          updateAccountBalance,
        ),
      );
    }
    updateAccountAddress(accountAddress);
  }
};

class BaseGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onRollClick() {
    const {
      accountAddress, chances, contract, betSize, web3,
    } = this.state;
    const rollUnder = chances + 1;
    const value = web3.utils.toWei(betSize.toString(), 'ether');
    contract.web3Contract.methods.playerRollDice(rollUnder).send({
      from: accountAddress,
      value,
    }).then((error, result) => {
      console.log(JSON.stringify(result));
      error && console.error(error);
    });
  }

  getTransactions(contract, setState) {
    contract.getMergedTransactionLogs((error, result) => {
      if (error) {
        console.log(error);
      } else {
        const allTransactions = result;
        // TODO: should be a prop via composition rather than inheritance
        const { transactionsFilter } = this.state;
        setState({ allTransactions });
        this.filterTransactions(transactionsFilter, setState);
      }
    });
  }

  /**
   * Retrieves web3 and contract info, then sets the following states:
   * - accountAddress
   * - accountBalance
   * - contract
   * - contractAddress
   * - contractBalance
   * - minBet
   * - maxBet
   * - maxChances
   * - network
   * - web3
   */
  getWeb3(setState) {
    const { showMessage, showWarningMessage } = this.props;
    const getIdCallback = web3 => (network) => {
      const contractAddress = contractAddresses[network];
      const contract = new EtherollContract(web3, contractAddress);
      const pullIntervalSeconds = 10 * 1000;
      // clearInterval() is in the componentWillUnmount()
      this.getTransactionsIntervalId = setInterval((
      ) => this.getTransactions(contract, setState), pullIntervalSeconds);
      this.getTransactions(contract, setState);
      setState({
        web3,
        network,
        contract,
        contractAddress,
      });
      contract.web3Contract.methods.minBet().call(
        minBetCallback(
          web3, showWarningMessage, this.updateState('minBet'),
        ),
      );
      contract.web3Contract.methods.minNumber().call(
        minNumberCallback(
          showWarningMessage, this.updateState('minChances'),
        ),
      );
      contract.web3Contract.methods.maxNumber().call(
        maxNumberCallback(
          showWarningMessage, this.updateState('maxChances'),
        ),
      );
      web3.eth.getBalance(
        contractAddress,
        getBalanceCallback(
          web3, showWarningMessage, this.updateState('contractBalance'),
        ),
      );
      web3.eth.getAccounts(
        getAccountsCallback(
          web3, showWarningMessage, this.updateState('accountAddress'), this.updateState('accountBalance'),
        ),
      );
    };
    const getWeb3CallbackOk = (results) => {
      results.web3.eth.net.getId().then(getIdCallback(results.web3));
    };
    const getWeb3CallbackError = () => {
      const classType = 'danger';
      const message = (
        <Fragment>
          {'No account connected, connect with a Web3-compatible wallet like '}
          <MetaMaskLink />
        </Fragment>
      );
      showMessage(classType, message);
    };
    getWeb3.then(getWeb3CallbackOk, getWeb3CallbackError);
  }

  filterTransactions(transactionsFilter, setState) {
    // TODO: should be a prop via composition rather than inheritance
    const { accountAddress, allTransactions } = this.state;
    let filteredTransactions = allTransactions.slice();
    if (transactionsFilter === '#my-transactions') {
      filteredTransactions = allTransactions.filter(transaction => (
        transaction.logBetEvent.returnValues.PlayerAddress.toLowerCase()
        === accountAddress.toLowerCase()
      ));
    }
    setState({ filteredTransactions, transactionsFilter });
  }

  updateState(key) {
    return (value) => {
      this.setState({ [key]: value });
    };
  }
}
BaseGame.propTypes = {
  showMessage: func.isRequired,
  showWarningMessage: func.isRequired,
};

export default BaseGame;
