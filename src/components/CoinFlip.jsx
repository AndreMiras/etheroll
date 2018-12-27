import React from 'react';
import BaseGame from './BaseGame';
import BetSize from './BetSize';
import ChanceOfWinning from './ChanceOfWinning';
import ContractInfo from './ContractInfo';
import FlipButton from './FlipButton';
import CoinFlipRecap from './CoinFlipRecap';
import CoinFlipTransactions from './CoinFlipTransactions';
import {
  Networks, contractAddresses,
} from '../utils/etheroll-contract';


class CoinFlip extends BaseGame {
  constructor(props) {
    super(props);
    this.state = {
      accountBalance: 0,
      betSize: 0.1,
      chances: 50,
      contractAddress: contractAddresses[Networks.mainnet],
      contractBalance: 0,
      minBet: BetSize.defaultProps.min,
      maxBet: BetSize.defaultProps.max,
      // TODO: merge with RollUnder
      network: Networks.mainnet,
      minChances: ChanceOfWinning.defaultProps.min,
      maxChances: ChanceOfWinning.defaultProps.max,
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
      betSize, accountAddress, accountBalance, contractAddress, contractBalance,
      filteredTransactions, minBet, maxBet, network,
    } = this.state;
    const setState = dict => this.setState(dict);
    const rollDisabled = accountAddress === null;
    return (
      <>
        <ContractInfo
          accountAddress={accountAddress}
          accountBalance={accountBalance}
          contractAddress={contractAddress}
          contractBalance={contractBalance}
          network={network}
        />
        <BetSize betSize={betSize} min={minBet} max={maxBet} updateBetSize={this.updateState('betSize')} />
        <CoinFlipRecap betSize={betSize} />
        <FlipButton isDisabled={rollDisabled} onClick={() => this.onRollClick()} />
        <CoinFlipTransactions
          network={network}
          onClick={transactionsFilter => this.filterTransactions(transactionsFilter, setState)}
          transactions={filteredTransactions}
        />
      </>
    );
  }
}
CoinFlip.propTypes = BaseGame.propTypes;

export default CoinFlip;
