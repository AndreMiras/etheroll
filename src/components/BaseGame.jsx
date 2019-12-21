import React, { Fragment } from 'react';
import { func } from 'prop-types';

import MetaMaskLink from './MetaMaskLink';
import getWeb3 from '../utils/get-web3';
import { EtherollContract, contractAddresses } from '../utils/etheroll-contract';


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
    const minBetCallback = web3 => (error, minBetWei) => {
      if (error) {
        this.showFetchContractInfoWarning();
      } else {
        const minBet = Number(web3.utils.fromWei(minBetWei, 'ether'));
        setState({ minBet });
      }
    };
    const minNumberCallback = (error, minNumber) => {
      if (error) {
        this.showFetchContractInfoWarning();
      }
      const minChances = minNumber - 1;
      setState({ minChances });
    };
    const maxNumberCallback = (error, maxNumber) => {
      if (error) {
        this.showFetchContractInfoWarning();
      }
      const maxChances = maxNumber - 1;
      setState({ maxChances });
    };
    const getBalanceCallback = web3 => (error, balance) => {
      // error can be null with the balance also null in rare cases
      if (error || balance === null) {
        const message = "Can't fetch contract balance.";
        this.showFetchContractInfoWarning(message);
      } else {
        const contractBalance = Number(web3.utils.fromWei(balance, 'ether'));
        setState({ contractBalance });
      }
    };
    const getAccountBalanceCallback = web3 => (err, balance) => {
      // error can be null with the balance also null in rare cases
      if (err || balance === null) {
        const message = "Can't fetch account balance.";
        showWarningMessage(message);
      } else {
        const accountBalance = Number(web3.utils.fromWei(balance, 'ether'));
        setState({ accountBalance });
      }
    };
    const getAccountsCallback = web3 => (error, accounts) => {
      if (error) {
        const message = "Can't retrieve accounts.";
        showWarningMessage(message);
      } else {
        const accountAddress = accounts.length === 0 ? null : accounts[0];
        if (accountAddress !== null) {
          web3.eth.getBalance(accountAddress, getAccountBalanceCallback(web3));
        }
        setState({ accountAddress });
      }
    };
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
      contract.web3Contract.methods.minBet().call(minBetCallback(web3));
      contract.web3Contract.methods.minNumber().call(minNumberCallback);
      contract.web3Contract.methods.maxNumber().call(maxNumberCallback);
      web3.eth.getBalance(contractAddress, getBalanceCallback(web3));
      web3.eth.getAccounts(getAccountsCallback(web3));
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

  showFetchContractInfoWarning(optionalMessage) {
    const { showWarningMessage } = this.props;
    const defaultMessage = "Can't fetch contract info.";
    const message = (typeof optionalMessage === 'undefined') ? defaultMessage : optionalMessage;
    showWarningMessage(message);
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
