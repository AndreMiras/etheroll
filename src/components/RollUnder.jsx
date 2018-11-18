import React from 'react';
import PropTypes from 'prop-types';

function RollUnder({ value }) {
  return (
    <div className="row">
      <div className="col">
        <h3>Roll under</h3>
      </div>
      <div className="col">
        <h3 className="roll-under-value">{value}</h3>
      </div>
    </div>
  );
}
RollUnder.propTypes = {
  value: PropTypes.number.isRequired,
};

export default RollUnder;
