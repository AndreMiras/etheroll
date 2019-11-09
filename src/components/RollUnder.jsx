import React from 'react';
import './css/RollUnder.css';
import BaseGame from './BaseGame';
import ContractInfo from './ContractInfo';
import BetSize from './BetSize';
import ChanceOfWinning from './ChanceOfWinning';
import RollUnderRecap from './RollUnderRecap';
import RollButton from './RollButton';
import Transactions from './Transactions';
import {
  Networks, contractAddresses,
} from '../utils/etheroll-contract';


class RollUnder extends BaseGame {
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
      transactionsFilter: '#all-transactions',
    };
  }

  componentDidMount() {
    const setState = dict => this.setState(dict);
    this.getWeb3(setState);
  }

  componentWillUnmount() {
    clearInterval(this.getTransactionsIntervalId);
  }

  render() {
    const {
      accountAddress, accountBalance, betSize, chances, contractAddress,
      contractBalance, filteredTransactions, minBet, maxBet, minChances, maxChances, network,
    } = this.state;
    const setState = dict => this.setState(dict);
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
        <form className="RollUnder">
          <h2>Place your bet</h2>
          <BetSize betSize={betSize} min={minBet} max={maxBet} updateBetSize={this.updateState('betSize')} />
          <ChanceOfWinning chances={chances} min={minChances} max={maxChances} updateChances={this.updateState('chances')} />
          <RollUnderRecap value={rollUnder} betSize={betSize} />
          <RollButton isDisabled={rollDisabled} onClick={() => this.onRollClick()} />
        </form>
        <Transactions
          network={network}
          onClick={transactionsFilter => this.filterTransactions(transactionsFilter, setState)}
          transactions={filteredTransactions}
        />
      </div>
    );
  }
}
RollUnder.propTypes = { ...BaseGame.propTypes };

export default RollUnder;
