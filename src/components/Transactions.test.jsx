import React from 'react';
import renderer from 'react-test-renderer';
import Transactions from './Transactions';

it('renders correctly on empty transactions', () => {
  const tree = renderer
    .create(<Transactions transactions={[]} network={3} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly on not empty transactions', () => {
  const mergedLog = {
    logBetEvent: {
      transactionHash: '0x0123',
      args: {
        PlayerNumber: '51',
        PlayerAddress: '0x0123',
      },
    },
  };
  const transactions = [mergedLog];
  const tree = renderer
    .create(<Transactions transactions={transactions} network={3} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
