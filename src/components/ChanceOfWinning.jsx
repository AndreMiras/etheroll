import React from 'react';
import PropTypes from 'prop-types';
import ValueSlider from './ValueSlider';

function ChanceOfWinning({
  chances, min, max, updateChances,
}) {
  return (
    <div className="form-group">
      <b>Chance of winning</b>
      <ValueSlider value={chances} min={min} max={max} updateValue={updateChances} addonText="&nbsp;%&nbsp;" />
    </div>
  );
}
ChanceOfWinning.propTypes = {
  chances: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  updateChances: PropTypes.func.isRequired,
};
ChanceOfWinning.defaultProps = {
  min: 0,
  max: 100,
};

export default ChanceOfWinning;
