import React from 'react';
import { bool, func, string } from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';

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

const FlipButton = ({ isDisabled, onClick }) => {
  // https://github.com/leesx/react-intl-demo2018/blob/0cd88df/docs/react-intl-corner-cases.md
  const messages = defineMessages({
    text: {
      id: 'flipbutton.text',
      defaultMessage: 'Flip Head',
    },
  });
  const intl = useIntl();
  return (
    <Button text={intl.formatMessage(messages.text)} isDisabled={isDisabled} onClick={onClick} />);
};
FlipButton.propTypes = {
  isDisabled: bool,
  onClick: func.isRequired,
};
FlipButton.defaultProps = {
  isDisabled: false,
};

export default FlipButton;
