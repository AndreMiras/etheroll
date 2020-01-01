import React from 'react';
import { number, func } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ValueSlider from './ValueSlider';

function ChanceOfWinning({
  chances, min, max, updateChances,
}) {
  return (
    <div className="form-group">
      <b>
        <FormattedMessage
          id="chanceofwinning.chanceofwinning"
          defaultMessage="Chance of winning"
        />
      </b>
      <ValueSlider
        value={chances}
        min={min}
        max={max}
        updateValue={updateChances}
        addonText="&nbsp;%&nbsp;"
      />
    </div>
  );
}
ChanceOfWinning.propTypes = {
  chances: number.isRequired,
  min: number,
  max: number,
  updateChances: func.isRequired,
};
ChanceOfWinning.defaultProps = {
  min: 0,
  max: 100,
};

export default ChanceOfWinning;
