import React from 'react';
import PropTypes from 'prop-types';
import ValueSlider from './ValueSlider';

function ChanceOfWinning({ chances, updateChances }) {
  return (
    <div className="form-group">
      <b>Chance of winning</b>
      <ValueSlider value={chances} updateValue={updateChances} />
    </div>
  );
}
ChanceOfWinning.propTypes = {
  chances: PropTypes.number.isRequired,
  updateChances: PropTypes.func.isRequired,
};

export default ChanceOfWinning;
