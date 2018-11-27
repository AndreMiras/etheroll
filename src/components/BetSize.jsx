import React from 'react';
import PropTypes from 'prop-types';
import ValueSlider from './ValueSlider';

function BetSize({
  betSize, min, max, updateBetSize,
}) {
  return (
    <div className="form-group">
      <b>Bet size</b>
      <ValueSlider value={betSize} updateValue={updateBetSize} step={0.1} min={min} max={max} addonText="ETH" />
    </div>
  );
}
BetSize.propTypes = {
  betSize: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  updateBetSize: PropTypes.func.isRequired,
};
BetSize.defaultProps = {
  min: 0,
  max: 10,
};

export default BetSize;
