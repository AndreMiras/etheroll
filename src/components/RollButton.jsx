import React from 'react';
import PropTypes from 'prop-types';

function Button({ isDisabled, onClick, text }) {
  return (
    <button type="button" className="btn btn-primary btn-lg" disabled={isDisabled} onClick={onClick}>
      {text}
    </button>
  );
}
Button.propTypes = {
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
Button.defaultProps = {
  isDisabled: false,
};

function RollButton({ isDisabled, onClick }) {
  return <Button text="Roll" isDisabled={isDisabled} onClick={onClick} />;
}
RollButton.propTypes = {
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
RollButton.defaultProps = {
  isDisabled: false,
};


export default RollButton;
