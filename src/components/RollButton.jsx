import React from 'react';
import PropTypes from 'prop-types';

function Button({ onClick, text }) {
  return (
    <button type="button" className="btn btn-primary btn-lg" onClick={onClick}>
      {text}
    </button>
  );
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

function RollButton({ onClick }) {
  return <Button text="Roll" onClick={onClick} />;
}
RollButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default RollButton;
