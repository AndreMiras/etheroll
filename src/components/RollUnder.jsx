import React from 'react';
import {
  arrayOf, func, number, shape, string,
} from 'prop-types';
import './css/RollUnder.css';
import onRollClick from './BaseGame';
import BetSize from './BetSize';
import ChanceOfWinning from './ChanceOfWinning';
import RollUnderRecap from './RollUnderRecap';
import RollButton from './RollButton';
import Transactions from './Transactions';


const RollUnder = (props) => {
  const {
    accountAddress, betSize, chances, contract,
    filterTransactions, filteredTransactions, minBet, maxBet, minChances, maxChances, network,
    updateState,
  } = props;
  const rollUnder = chances + 1;
  const onRollClickProps = {
    accountAddress, rollUnder, contract, betSize,
  };
  const rollDisabled = accountAddress === null;
  return (
    <div>
      <form className="RollUnder">
        <BetSize betSize={betSize} min={minBet} max={maxBet} updateBetSize={updateState('betSize')} />
        <ChanceOfWinning chances={chances} min={minChances} max={maxChances} updateChances={updateState('chances')} />
        <RollUnderRecap value={rollUnder} betSize={betSize} />
        <RollButton isDisabled={rollDisabled} onClick={() => onRollClick(onRollClickProps)} />
      </form>
      <Transactions
        network={network}
        onClick={transactionsFilter => filterTransactions(transactionsFilter)}
        transactions={filteredTransactions}
      />
    </div>
  );
};
RollUnder.propTypes = {
  accountAddress: string,
  betSize: number.isRequired,
  chances: number.isRequired,
  contract: shape({
    // TODO: seems completely ignored
    // https://github.com/facebook/prop-types/issues/181
    todo: number,
  }),
  filterTransactions: func.isRequired,
  filteredTransactions: arrayOf(shape({
    // TODO: seems completely ignored
    // https://github.com/facebook/prop-types/issues/181
    todo: number,
  })).isRequired,
  minBet: number.isRequired,
  maxBet: number.isRequired,
  minChances: number.isRequired,
  maxChances: number.isRequired,
  network: number.isRequired,
  updateState: func.isRequired,
};
RollUnder.defaultProps = {
  accountAddress: null,
  contract: null,
};

export default RollUnder;
