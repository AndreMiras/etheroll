import React from 'react';
import { bool, func, string } from 'prop-types';

const Button = ({ isDisabled, onClick, text }) => (
  <button
    type="button"
    className="btn btn-primary btn-lg col-md-3"
    disabled={isDisabled}
    onClick={onClick}
  >
    {text}
  </button>
);
Button.propTypes = {
  isDisabled: bool,
  onClick: func.isRequired,
  text: string.isRequired,
};
Button.defaultProps = {
  isDisabled: false,
};

function FlipButton({ isDisabled, onClick }) {
  return <Button text="Flip Head" isDisabled={isDisabled} onClick={onClick} />;
}
FlipButton.propTypes = {
  isDisabled: bool,
  onClick: func.isRequired,
};
FlipButton.defaultProps = {
  isDisabled: false,
};

export default FlipButton;
