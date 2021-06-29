import React from 'react';
import Slider from 'rc-slider/lib/Slider';
import { func, number, string } from 'prop-types';
import 'rc-slider/assets/index.css';


const ValueSlider = ({
  value, updateValue, step, min, max, addonText, toFixedDigits,
}) => {
  const addon = (addonText !== null) ? (
    <div className="input-group-append">
      <span className="input-group-text text-monospace">{addonText}</span>
    </div>
  ) : null;
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
};
ValueSlider.propTypes = {
  value: number.isRequired,
  updateValue: func.isRequired,
  step: number,
  min: number,
  max: number,
  addonText: string,
  toFixedDigits: number,
};
ValueSlider.defaultProps = {
  step: 1,
  min: 0,
  max: 100,
  addonText: null,
  toFixedDigits: null,
};

export default ValueSlider;
