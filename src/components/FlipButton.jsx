import React from 'react';
import PropTypes from 'prop-types';

function Button({ isDisabled, onClick, text }) {
  return (
    <button type="button" className="btn btn-primary btn-lg col-md-3" disabled={isDisabled} onClick={onClick}>
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

function FlipButton({ isDisabled, onClick }) {
  return <Button text="Flip Head" isDisabled={isDisabled} onClick={onClick} />;
}
FlipButton.propTypes = {
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
FlipButton.defaultProps = {
  isDisabled: false,
};

export default FlipButton;
