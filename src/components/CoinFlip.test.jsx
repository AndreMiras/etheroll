import React from 'react';
import createComponentWithIntl from '../utils/createComponentWithIntl';
import CoinFlip from './CoinFlip';

it('renders correctly', () => {
  const accountAddress = '0x46044beaa1e985c67767e04de58181de5daaa00f';
  const betSize = 0.1;
  const filteredTransactions = [];
  const maxBet = 10;
  const minBet = 0;
  const network = 1;
  const filterTransactions = () => {};
  const updateState = () => () => {};
  const gameProps = {
    accountAddress,
    betSize,
    filteredTransactions,
    maxBet,
    minBet,
    network,
    updateState,
    filterTransactions,
  };
  const tree = createComponentWithIntl(
    <CoinFlip {...gameProps} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
