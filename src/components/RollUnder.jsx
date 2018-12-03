import React from 'react';
import PropTypes from 'prop-types';


function getProfit(betSize, chances) {
  let profit = 0;
  const houseEdge = 1 / 100.0;
  const chancesLoss = 100.0 - chances;
  if (chances !== 0 && chancesLoss !== 0) {
    let payout = ((chancesLoss / chances) * betSize) + betSize;
    payout *= (1 - houseEdge);
    profit = payout - betSize;
  }
  return profit;
}

function RollUnder({ betSize, value }) {
  const chances = value - 1;
  const profit = getProfit(betSize, chances);
  return (
    <div className="row">
      <div className="col-6">
        <h3>Roll under</h3>
      </div>
      <div className="col-6">
        <h3 className="text-right">{value}</h3>
      </div>
      <div className="col-6">
        With a wager of
      </div>
      <div className="col-6">
        <p className="text-right mb-0">
          {betSize}
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
RollUnder.propTypes = {
  betSize: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default RollUnder;
