import React from 'react';
import Slider from 'rc-slider/lib/Slider';
import PropTypes from 'prop-types';
import 'rc-slider/assets/index.css';


function ValueSlider({
  value, updateValue, step, min, max, addonText, toFixedDigits,
}) {
  let addon = null;
  if (addonText !== null) {
    addon = (
      <div className="input-group-append">
        <span className="input-group-text text-monospace">{addonText}</span>
      </div>
    );
  }
  const formattedValue = toFixedDigits === null ? value : value.toFixed(toFixedDigits);
  return (
    <div className="row">
      <div className="input-group col-sm-3 col-lg-2">
        <input
          type="number"
          className="form-control"
          onChange={e => updateValue(Number(e.target.value))}
          value={formattedValue}
        />
        {addon}
      </div>
      <div className="col">
        <Slider onChange={updateValue} value={value} step={step} min={min} max={max} />
      </div>
    </div>
  );
}
ValueSlider.propTypes = {
  value: PropTypes.number.isRequired,
  updateValue: PropTypes.func.isRequired,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  addonText: PropTypes.string,
  toFixedDigits: PropTypes.number,
};
ValueSlider.defaultProps = {
  step: 1,
  min: 0,
  max: 100,
  addonText: null,
  toFixedDigits: null,
};

export default ValueSlider;
