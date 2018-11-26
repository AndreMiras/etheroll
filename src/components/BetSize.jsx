import React from 'react';
import PropTypes from 'prop-types';
import ValueSlider from './ValueSlider';

function BetSize({ betSize, updateBetSize }) {
  return (
    <div className="form-group">
      <b>Bet size</b>
      <ValueSlider value={betSize} updateValue={updateBetSize} step={0.1} max={10} addonText="ETH" />
    </div>
  );
}
BetSize.propTypes = {
  betSize: PropTypes.number.isRequired,
  updateBetSize: PropTypes.func.isRequired,
};

export default BetSize;
