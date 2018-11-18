import React from 'react';
import Slider from 'rc-slider/lib/Slider';
import PropTypes from 'prop-types';
import 'rc-slider/assets/index.css';


function ValueSlider({
  value, updateValue, step, max,
}) {
  return (
    <div className="row">
      <div className="col-sm-3 col-lg-2">
        <input
          type="number"
          className="form-control"
          onChange={e => updateValue(Number(e.target.value))}
          value={value}
        />
      </div>
      <div className="col">
        <Slider onChange={updateValue} value={value} step={step} max={max} />
      </div>
    </div>
  );
}
ValueSlider.propTypes = {
  value: PropTypes.number.isRequired,
  updateValue: PropTypes.func.isRequired,
  step: PropTypes.number,
  max: PropTypes.number,
};
ValueSlider.defaultProps = {
  step: 1,
  max: 100,
};

export default ValueSlider;
