import React from 'react';
import PropTypes from 'prop-types';
import { getProfit } from '../utils/etheroll-contract';


function CoinFlipRecap({ betSize }) {
  const chances = 50;
  const profit = getProfit(betSize, chances);
  return (
    <p>
      {'Flip Head with a wager of '}
      {betSize}
      {' for a profit of '}
      {profit.toFixed(2)}
    </p>
  );
}
CoinFlipRecap.propTypes = {
  betSize: PropTypes.number.isRequired,
};

export default CoinFlipRecap;
