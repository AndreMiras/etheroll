import React from 'react';
import PropTypes from 'prop-types';

function Alert({classType, message}) {
  if (!message) {
    return null;
  }
  return (
    <div className={`alert alert-${classType}`} role="alert">
      {message}
    </div>
  );
}
Alert.propTypes = {
  classType: PropTypes.string,
  message: PropTypes.string,
};
Alert.defaultProps = {
  classType: 'primary',
  message: null,
};

export default Alert;

