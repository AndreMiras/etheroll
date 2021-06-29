import React, { Fragment } from 'react';
import {
  arrayOf, func, number, shape, string,
} from 'prop-types';
import onRollClick from './BaseGame';
import BetSize from './BetSize';
import FlipButton from './FlipButton';
import CoinFlipRecap from './CoinFlipRecap';
import CoinFlipTransactions from './CoinFlipTransactions';


const CoinFlip = (props) => {
  const {
    accountAddress, betSize, contract,
    filterTransactions, filteredTransactions, minBet, maxBet, network,
    updateState,
  } = props;
  const rollUnder = 51;
  const onRollClickProps = {
    accountAddress, rollUnder, contract, betSize,
  };
  const rollDisabled = accountAddress === null;
  return (
    <Fragment>
      <BetSize betSize={betSize} min={minBet} max={maxBet} updateBetSize={updateState('betSize')} />
      <CoinFlipRecap betSize={betSize} />
      <FlipButton isDisabled={rollDisabled} onClick={() => onRollClick(onRollClickProps)} />
      <CoinFlipTransactions
        network={network}
        onClick={transactionsFilter => filterTransactions(transactionsFilter)}
        transactions={filteredTransactions}
      />
    </Fragment>
  );
};

CoinFlip.propTypes = {
  accountAddress: string,
  betSize: number.isRequired,
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
  network: number.isRequired,
  updateState: func.isRequired,
};
CoinFlip.defaultProps = {
  accountAddress: null,
  contract: null,
};

export default CoinFlip;
