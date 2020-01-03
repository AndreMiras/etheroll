import React from 'react';
import { number } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { getProfit } from '../utils/etheroll-contract';


function CoinFlipRecap({ betSize }) {
  const chances = 50;
  const profit = getProfit(betSize, chances);
  return (
    <p>
      <FormattedMessage
        id="coinfliprecap.flip-head-with-a-wager"
        defaultMessage={'Flip Head with a wager of {betSize} for a profit of {profit}'}
        values={{ betSize: betSize.toFixed(2), profit: profit.toFixed(2) }}
      />
    </p>
  );
}
CoinFlipRecap.propTypes = {
  betSize: number.isRequired,
};

export default CoinFlipRecap;
