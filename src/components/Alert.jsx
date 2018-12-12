import React from 'react';
import { string, node, oneOfType } from 'prop-types';

function Alert({ classType, message }) {
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
  classType: string,
  message: oneOfType([string, node]),
};
Alert.defaultProps = {
  classType: 'primary',
  message: null,
};

export default Alert;
