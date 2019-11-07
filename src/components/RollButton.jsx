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

function RollButton({ isDisabled, onClick }) {
  return <Button text="Roll" isDisabled={isDisabled} onClick={onClick} />;
}
RollButton.propTypes = {
  isDisabled: bool,
  onClick: func.isRequired,
};
RollButton.defaultProps = {
  isDisabled: false,
};

export default RollButton;
