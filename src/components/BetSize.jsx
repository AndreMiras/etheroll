import React from 'react';
import { number, func } from 'prop-types';
import ValueSlider from './ValueSlider';

function BetSize({
  betSize, min, max, updateBetSize,
}) {
  return (
    <div className="form-group">
      <b>Bet size</b>
      <ValueSlider value={betSize} updateValue={updateBetSize} step={0.05} min={min} max={max} addonText="ETH" toFixedDigits={2} />
    </div>
  );
}
BetSize.propTypes = {
  betSize: number.isRequired,
  min: number,
  max: number,
  updateBetSize: func.isRequired,
};
BetSize.defaultProps = {
  min: 0,
  max: 10,
};

export default BetSize;
