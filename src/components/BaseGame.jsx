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
      error
        && console.error(error)
        || console.log(JSON.stringify(result));
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
    getWeb3.then((results) => {
      results.web3.eth.net.getId().then((network) => {
        const { web3 } = results;
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
        contract.web3Contract.methods.minBet().call((error, minBetWei) => {
          if (error) {
            this.showFetchContractInfoWarning();
          } else {
            const minBet = Number(web3.utils.fromWei(minBetWei, 'ether'));
            setState({ minBet });
          }
        });
        contract.web3Contract.methods.minNumber().call((error, minNumber) => {
          if (error) {
            this.showFetchContractInfoWarning();
          }
          const minChances = minNumber - 1;
          setState({ minChances });
        });
        contract.web3Contract.methods.maxNumber().call((error, maxNumber) => {
          if (error) {
            this.showFetchContractInfoWarning();
          }
          const maxChances = maxNumber - 1;
          setState({ maxChances });
        });
        web3.eth.getBalance(contractAddress, (error, balance) => {
          // error can be null with the balance also null in rare cases
          if (error || balance === null) {
            const message = "Can't fetch contract balance.";
            this.showFetchContractInfoWarning(message);
          } else {
            const contractBalance = Number(web3.utils.fromWei(balance, 'ether'));
            setState({ contractBalance });
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
                  const accountBalance = Number(web3.utils.fromWei(balance, 'ether'));
                  setState({ accountBalance });
                }
              });
            }
            setState({ accountAddress });
          }
        });
      });
    }, () => {
      const classType = 'danger';
      const message = (
        <Fragment>
          {'No account connected, connect with a Web3-compatible wallet like '}
          <MetaMaskLink />
        </Fragment>
      );
      showMessage(classType, message);
    });
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
        transaction.logBetEvent.args.PlayerAddress.toLowerCase() === accountAddress.toLowerCase()
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
