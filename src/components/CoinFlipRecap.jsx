import React from 'react';
import PropTypes from 'prop-types';
import { getProfit } from '../utils/etheroll-contract';


function CoinFlipRecap({ betSize }) {
  const chances = 50;
  const profit = getProfit(betSize, chances);
  return (
    <div className="row">
      <div className="col-6">
        <h3>Flip</h3>
      </div>
      <div className="col-6">
        <h3 className="text-right">Head</h3>
      </div>
      <div className="col-6">
        With a wager of
      </div>
      <div className="col-6">
        <p className="text-right mb-0">
          {betSize.toFixed(2)}
          &nbsp;
          ETH
        </p>
      </div>
      <div className="col-6">
        For a profit of
      </div>
      <div className="col-6">
        <p className="text-right">
          {profit.toFixed(2)}
          &nbsp;
          ETH
        </p>
      </div>
    </div>
  );
}
CoinFlipRecap.propTypes = {
  betSize: PropTypes.number.isRequired,
};

export default CoinFlipRecap;
